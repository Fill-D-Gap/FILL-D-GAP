import { useRef, useState } from 'react'
import { supabase } from '../../lib/supabaseClient.js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const countries = [
    { code: '+507', label: 'Panama' },
    { code: '+1', label: 'United States / Canada' },
    { code: '+52', label: 'Mexico' },
    { code: '+57', label: 'Colombia' },
    { code: '+58', label: 'Venezuela' },
    { code: '+506', label: 'Costa Rica' },
    { code: '+503', label: 'El Salvador' },
    { code: '+504', label: 'Honduras' },
    { code: '+505', label: 'Nicaragua' },
    { code: '+502', label: 'Guatemala' },
    { code: '+593', label: 'Ecuador' },
    { code: '+51', label: 'Peru' },
    { code: '+54', label: 'Argentina' },
    { code: '+56', label: 'Chile' },
    { code: '+55', label: 'Brazil' },
    { code: '+34', label: 'Spain' },
]

const provincesByCountry = {
    Panama: [
        'Bocas del Toro',
        'Chiriqui',
        'Cocle',
        'Colon',
        'Darien',
        'Herrera',
        'Los Santos',
        'Panama',
        'Panama Oeste',
        'Veraguas',
        'Guna Yala',
        'Ngabe-Bugle',
        'Embera-Wounaan',
    ],
    'United States / Canada': ['Alberta', 'British Columbia', 'Ontario', 'Quebec', 'Texas', 'Florida', 'New York', 'California'],
    Mexico: ['Ciudad de Mexico', 'Jalisco', 'Nuevo Leon', 'Puebla', 'Yucatan'],
    Colombia: ['Antioquia', 'Atlantico', 'Bogota D.C.', 'Cundinamarca', 'Valle del Cauca'],
    Venezuela: ['Caracas', 'Miranda', 'Aragua', 'Carabobo', 'Zulia'],
    'Costa Rica': ['San Jose', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste'],
    'El Salvador': ['San Salvador', 'Santa Ana', 'San Miguel', 'La Libertad'],
    Honduras: ['Francisco Morazan', 'Cortes', 'Atlantida'],
    Nicaragua: ['Managua', 'Leon', 'Granada'],
    Guatemala: ['Guatemala', 'Sacatepequez', 'Quetzaltenango'],
    Ecuador: ['Pichincha', 'Guayas', 'Azuay'],
    Peru: ['Lima', 'Arequipa', 'Cusco'],
    Argentina: ['Buenos Aires', 'Cordoba', 'Santa Fe'],
    Chile: ['Santiago', 'Valparaiso', 'Biobio'],
    Brazil: ['Sao Paulo', 'Rio de Janeiro', 'Minas Gerais'],
    Spain: ['Madrid', 'Barcelona', 'Valencia'],
}

const documentTypes = ['Cedula', 'Pasaporte']
const availabilityOptions = ['Local', 'Entre provincias', 'Internacional']
const licenseOptions = ['Si', 'No']

const initialForm = {
    fullName: '',
    email: '',
    phoneCountryCode: '+507',
    phoneNumber: '',
    documentType: 'Cedula',
    documentNumber: '',
    vocation: '',
    secondaryVocation: '',
    province: '',
    country: 'Panama',
    experienceYears: '',
    availability: '',
    license: 'No',
    licenseCountry: '',
    cvFile: null,
}

function Registro() {
    const [form, setForm] = useState(initialForm)
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState('')
    const fileInputRef = useRef(null)

    const provinceOptions = provincesByCountry[form.country] ?? []

    const onChange = (event) => {
        const { name, value, files, type } = event.target
        setForm((current) => {
            if (name === 'country') {
                const nextProvinceOptions = provincesByCountry[value] ?? []
                return {
                    ...current,
                    country: value,
                    province: nextProvinceOptions.includes(current.province) ? current.province : '',
                }
            }

            return {
                ...current,
                [name]: type === 'file' ? files?.[0] ?? null : value,
            }
        })
    }

    const resetForm = () => {
        setForm(initialForm)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        setStatus('submitting')

        try {
            if (!supabase) {
                throw new Error('Missing Supabase environment variables.')
            }

            let cvUrl = null
            if (form.cvFile) {
                const file = form.cvFile
                const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
                if (!isPdf) {
                    throw new Error('CV must be a PDF file.')
                }

                const safeName = `${Date.now()}-${file.name}`.replace(/\s+/g, '-')
                const bucketPath = `cvs/${safeName}`

                const { error: uploadError } = await supabase.storage
                    .from('candidate-files')
                    .upload(bucketPath, file, {
                        cacheControl: '3600',
                        upsert: false,
                        contentType: 'application/pdf',
                    })

                if (uploadError) throw uploadError

                const { data } = supabase.storage
                    .from('candidate-files')
                    .getPublicUrl(bucketPath)

                cvUrl = data.publicUrl
            }

            const payload = {
                full_name: form.fullName.trim(),
                email: form.email.trim(),
                phone_country_code: form.phoneCountryCode,
                phone: form.phoneNumber.trim(),
                document_type: form.documentType,
                document_number: form.documentNumber.trim(),
                vocation: form.vocation.trim(),
                secondary_vocation: form.secondaryVocation.trim() || null,
                province: form.province.trim(),
                country: form.country.trim(),
                experience_years: Number(form.experienceYears || 0),
                availability: form.availability,
                license: form.license === 'Si',
                license_country: form.license === 'Si' ? form.licenseCountry.trim() : null,
                reference_letter_url: cvUrl,
                status: 'pending',
            }

            const { error: insertError } = await supabase
                .from('candidate_applications')
                .insert(payload)

            if (insertError) {
                if (insertError.code === '23505') {
                    throw new Error('A record already exists with that identity document.')
                }
                throw insertError
            }

            if (!supabaseUrl || !supabaseAnonKey) {
                throw new Error('Missing Supabase environment variables.')
            }

            const notifyResponse = await fetch(`${supabaseUrl}/functions/v1/candidate-alert`, {
                method: 'POST',
                headers: {
                    apikey: supabaseAnonKey,
                    Authorization: `Bearer ${supabaseAnonKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            if (!notifyResponse.ok) {
                const details = await notifyResponse.text()
                console.warn('Notification email failed:', details)
            }

            setStatus('success')
            resetForm()
        } catch (submitError) {
            setError(submitError?.message || 'Could not send the registration.')
            setStatus('error')
        }
    }

return (
    <section id="registro" className="sticky top-[72px] z-30 h-[calc(100vh-72px)] overflow-auto bg-[#F8FCFB] px-4 sm:px-6 lg:px-10 py-12 md:py-16">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
                <p className="font-montserrat text-sm uppercase tracking-[0.24em] text-[#262788] font-semibold mb-3">
                    Registro
                </p>
                <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-[#262788] leading-tight">
                    Regístrate y únete a nuestra comunidad.
                </h2>
                <p className="font-montserrat text-base md:text-lg text-[#2B2B2B] mt-4 max-w-2xl">
                    Completa tus datos para verificar tu perfil y avanzar en el proceso.
                </p>
                <div className="mt-8 bg-white/80 border border-[#DFE4EA] px-6 py-6">
                    <h3 className="font-montserrat text-lg font-bold text-[#262788]">
                        Preguntas frecuentes
                    </h3>
                    <p className="font-montserrat text-sm md:text-base text-[#2B2B2B] mt-2">
                        Más adelante esta área puede convertirse en una sección de respuestas rápidas para dudas comunes.
                    </p>
                    <p className="font-montserrat text-xs text-[#878787] mt-3">
                        Por ahora, la prioridad es que el usuario vea el valor de la comunidad y complete su registro.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#D4FCF4] border border-[#DFE4EA] px-6 py-6 md:px-8 md:py-8 shadow-sm">
                <h3 className="font-montserrat text-2xl font-bold text-[#262788]">
                    Formulario de registro de talento
                </h3>
                <p className="font-montserrat text-sm text-[#2B2B2B] mt-2 mb-6">
                    Regístrate y forma parte de nuestra comunidad.
                </p>

                <div className="grid gap-4">
                    <label className="grid gap-2">
                        <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">
                            Nombre completo
                        </span>
                        <input
                            name="fullName"
                            value={form.fullName}
                            onChange={onChange}
                            className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95"
                            type="text"
                            required
                        />
                    </label>

                    <label className="grid gap-2">
                        <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">
                            Correo
                        </span>
                        <input
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95"
                            type="email"
                            required
                        />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">
                                Código de país
                            </span>
                            <select
                                name="phoneCountryCode"
                                value={form.phoneCountryCode}
                                onChange={onChange}
                                className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95"
                                required
                            >
                                {countries.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.code} - {country.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">
                                Celular
                            </span>
                            <input
                                name="phoneNumber"
                                value={form.phoneNumber}
                                onChange={onChange}
                                className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95"
                                type="tel"
                                inputMode="tel"
                                placeholder="Número de teléfono"
                                required
                            />
                        </label>
                    </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="grid gap-2">
                                <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Tipo de documento</span>
                                <select name="documentType" value={form.documentType} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" required>
                                    {documentTypes.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="grid gap-2">
                                <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Numero de identidad</span>
                                <input name="documentNumber" value={form.documentNumber} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="text" required />
                            </label>
                        </div>

                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Tu vocación</span>
                            <input name="vocation" value={form.vocation} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="text" required />
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Segunda vocación</span>
                            <input name="secondaryVocation" value={form.secondaryVocation} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="text" placeholder="Optional" />
                        </label>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="grid gap-2">
                                <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Ciudad</span>
                                <select name="country" value={form.country} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" required>
                                    {Object.keys(provincesByCountry).map((countryName) => (
                                        <option key={countryName} value={countryName}>
                                            {countryName}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="grid gap-2">
                                <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Provincia</span>
                                <select name="province" value={form.province} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" required>
                                    <option value="">Select a province</option>
                                    {provinceOptions.map((province) => (
                                        <option key={province} value={province}>
                                            {province}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Disponibilidad para viajar</span>
                            <select name="availability" value={form.availability} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" required>
                                <option value="">Select an option</option>
                                {availabilityOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Años de experiencia</span>
                            <input name="experienceYears" value={form.experienceYears} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="number" min="0" required />
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Licencia para ejercer</span>
                            <select name="license" value={form.license} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white" required>
                                {licenseOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>
                        {form.license === 'Si' && (
                            <label className="grid gap-2">
                                <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">País de licencia</span>
                                <input name="licenseCountry" value={form.licenseCountry} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="text" required />
                            </label>
                        )}
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">CV</span>
                            <input
                                ref={fileInputRef}
                                name="cvFile"
                                onChange={onChange}
                                className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white w-full text-sm text-[#2B2B2B] file:py-1 file:px-3 file:border-0 file:bg-[#262788] file:text-white file:text-sm file:font-semibold file:font-montserrat hover:file:bg-[#422C9B] file:transition-colors file:cursor-pointer"
                                type="file"
                                accept=".pdf,application/pdf"
                            />
                            <span className="font-montserrat text-xs text-[#878787]">
                                Solo archivos PDF de hasta 45 MB.
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="mt-6 w-full bg-[#262788] text-[#F8FCFB] font-montserrat font-semibold px-5 py-3 hover:bg-[#422C9B] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {status === 'submitting' ? 'Sending...' : 'Submit registration'}
                    </button>

                    {error && (
                        <p className="font-montserrat text-sm text-[#ED5275] mt-4">
                            {error}
                        </p>
                    )}

                    {status === 'success' && (
                        <p className="font-montserrat text-sm text-[#262788] mt-4 font-semibold">
                            Registro enviado.
                        </p>
                    )}

                    <p className="font-montserrat text-xs text-[#262788] mt-4">
                        Los datos enviados se verificarán cuando se encuentre su conexión coincidente.
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Registro

