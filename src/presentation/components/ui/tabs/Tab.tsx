
interface Props {
    label: string,
    active: boolean
    fn : ()=> void
}
const Tab = ({ label, active, fn }: Props) => {
    return (
        <button
            id="puesto"
            className={`
                px-5 py-1 text-sm 
                border-b-2 
                ${active ? 'border-primary' : 'border-white'}
            `} onClick={fn}  >
            {
                label
            }
        </button>
    )
}

export default Tab