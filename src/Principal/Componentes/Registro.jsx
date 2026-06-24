import { useRef, useState } from 'react'
import { supabase } from '../../lib/supabaseClient.js'

const initialForm = {
    fullName: '',
    email: '',
    phone: '',
    vocation: '',
    province: '',
    country: '',
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

    const onChange = (event) => {
        const { name, value, files, type } = event.target
        setForm((current) => ({
            ...current,
            [name]: type === 'file' ? files?.[0] ?? null : value,
        }))
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
                throw new Error('Faltan las variables de Supabase en el entorno.')
            }

            let cvUrl = null
            if (form.cvFile) {
                const file = form.cvFile
                const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
                if (!isPdf) {
                    throw new Error('El CV debe ser un archivo PDF.')
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
                phone: form.phone.trim(),
                vocation: form.vocation.trim(),
                province: form.province.trim(),
                country: form.country.trim(),
                experience_years: Number(form.experienceYears || 0),
                availability: form.availability,
                license: form.license === 'Sí',
                license_country: form.licenseCountry.trim(),
                reference_letter_url: cvUrl,
                status: 'pending',
            }

            const { error: insertError } = await supabase
                .from('candidate_applications')
                .insert(payload)

            if (insertError) throw insertError

            setStatus('success')
            resetForm()
        } catch (submitError) {
            setError(submitError?.message || 'No se pudo enviar el registro.')
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
                        Regístrate y forma parte de nuestra comunidad.
                    </h2>
                    <p className="font-montserrat text-base md:text-lg text-[#2B2B2B] mt-4 max-w-2xl">
                        Completa tus datos para verificar tu perfil y avanzar en el proceso de ingreso.
                    </p>
                    <div className="mt-8 bg-white/80 border border-[#DFE4EA] px-6 py-6">
                        <h3 className="font-montserrat text-lg font-bold text-[#262788]">Preguntas frecuentes</h3>
                        <p className="font-montserrat text-sm md:text-base text-[#2B2B2B] mt-2">
                            Más adelante esta área puede convertirse en una sección de respuestas rápidas para dudas comunes.
                        </p>
                        <p className="font-montserrat text-xs text-[#878787] mt-3">
                            Por ahora la prioridad es que el usuario vea el valor de la comunidad y complete su registro.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#D4FCF4] border border-[#DFE4EA] px-6 py-6 md:px-8 md:py-8 shadow-sm">
                    <h3 className="font-montserrat text-2xl font-bold text-[#262788]">
                        Formulario de inscripción de talento
                    </h3>
                    <p className="font-montserrat text-sm text-[#2B2B2B] mt-2 mb-6">
                        Regístrate y forma parte de nuestra comunidad.
                    </p>

                    <div className="grid gap-4">
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Nombre completo</span>
                            <input name="fullName" value={form.fullName} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="text" required />
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Correo electrónico</span>
                            <input name="email" value={form.email} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="email" required />
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Teléfono</span>
                            <input name="phone" value={form.phone} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="tel" required />
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Tu vocación</span>
                            <input name="vocation" value={form.vocation} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="text" required />
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Provincia de residencia</span>
                            <input name="province" value={form.province} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="text" required />
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">País</span>
                            <input name="country" value={form.country} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="text" required />
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Disponibilidad para viajar</span>
                            <select name="availability" value={form.availability} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" required>
                                <option value="">Selecciona una opción</option>
                                <option value="Local">Local</option>
                                <option value="Entre provincias">Entre provincias</option>
                                <option value="Internacional">Internacional</option>
                            </select>
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Años de experiencia</span>
                            <input name="experienceYears" value={form.experienceYears} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="number" min="0" required />
                        </label>
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Licencia para ejercer</span>
                            <select name="license" value={form.license} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white" required>
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                        </label>
                        {form.license === 'Sí' && (
                            <label className="grid gap-2">
                                <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">País de licencia</span>
                                <input name="licenseCountry" value={form.licenseCountry} onChange={onChange} className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white/95" type="text" />
                            </label>
                        )}
                        <label className="grid gap-2">
                            <span className="font-montserrat text-sm font-semibold text-[#2B2B2B]">Currículum</span>
                            <input
                                ref={fileInputRef}
                                name="cvFile"
                                onChange={onChange}
                                className="border border-[#DFE4EA] px-4 py-3 outline-none focus:border-[#262788] bg-white w-full text-sm text-[#2B2B2B]
                                file:py-1 file:px-3 file:border-0 file:bg-[#262788] file:text-white file:text-sm file:font-semibold file:font-montserrat
                                hover:file:bg-[#422C9B] file:transition-colors file:cursor-pointer"
                                type="file"
                                accept=".pdf,application/pdf"
                            />
                            <span className="font-montserrat text-xs text-[#878787]">
                                Solo PDF de 45 MB o menos.
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="mt-6 w-full bg-[#262788] text-[#F8FCFB] font-montserrat font-semibold px-5 py-3 hover:bg-[#422C9B] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {status === 'submitting' ? 'Enviando...' : 'Enviar registro'}
                    </button>

                    {error && (
                        <p className="font-montserrat text-sm text-[#ED5275] mt-4">
                            {error}
                        </p>
                    )}

                    {status === 'success' && (
                        <p className="font-montserrat text-sm text-[#262788] mt-4 font-semibold">
                            Registro enviado. Lo revisaremos pronto.
                        </p>
                    )}

                    <p className="font-montserrat text-xs text-[#262788] mt-4">
                        Los datos suministrados se verificarán al encontrar tu eslabón de enganche.
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Registro
