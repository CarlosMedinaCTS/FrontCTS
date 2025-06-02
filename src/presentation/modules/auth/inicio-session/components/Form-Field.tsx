import Input from "../../../../components/ui/inputs/Input";



const FormField = ({
    icon,
    inputProps,
    error,
    inputRef,
}: {
    icon: React.ReactNode;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    error?: string;
    inputRef?: React.Ref<HTMLInputElement>;
}) => (
    <div className="relative">
        <span className="absolute top-2.5 left-2 text-gray-400/80">{icon}</span>
        <Input className="pl-9" ref={inputRef} {...inputProps} />
        {error && (
            <span className="text-red-400 text-xs font-medium">{error} *</span>
        )}
    </div>
);



export default FormField