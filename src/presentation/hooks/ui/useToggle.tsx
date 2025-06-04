import { useState } from "react";


const useToggle = () => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    }

    const handleManual = (type : boolean)=> {
        setIsToggled(type)
    }
    return {
        handleToggle,
        isToggled,
        handleManual
    }
}

export default useToggle