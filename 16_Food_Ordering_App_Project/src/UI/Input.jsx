export default function Input({ label, id, type }) {
    return (
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input type={type} name={id} id={id} required />
        </p>
    )
}