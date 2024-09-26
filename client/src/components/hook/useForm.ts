import { useState } from 'react';
interface FormValues {
    [key: string]: any;
}

interface UseFormReturn {
    values: FormValues;
    setValues: React.Dispatch<React.SetStateAction<FormValues>>;
    errors: FormValues;
    setErrors: React.Dispatch<React.SetStateAction<FormValues>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function useForm(getFreshModelObject:() => FormValues) {

    const [values, setValues] = useState<FormValues>(getFreshModelObject());
    const [errors, setErrors] = useState<FormValues>({});

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    }
}