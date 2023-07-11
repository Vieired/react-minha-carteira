import { useCallback, useEffect, useState, ReactNode, useMemo } from "react";
import { Accept, FileError, FileRejection, useDropzone } from "react-dropzone";
import { decodeBase64ToFile, encodeFileToBase64 } from "../../../shared/helpers/base64Helpers";
import { CustomFile, ServerFile } from "../../../shared/models/Upload";
import { Container, Wrap, Wrapper } from "./styles";

interface Props {
    id?: string;
    name: string;
    value?: ServerFile | undefined;
    formik?: any;
    label?: string;
    placeholder?: string;
    tooltip?: string;
    disabled?: boolean;
    maxSizeMB?: 1 | 2 | 3 | 4 | 5;
    extensions?: Accept;
    rejectedFileFeedback?: (arg: ReactNode|string|undefined) => void;
    // onChange?(e: React.ChangeEvent<unknown>): void;
}

interface ErrosMessage {
    code: string;
    message: string;
}

const InputSingleFileUpload: React.FC<Props> = ({
    id,
    name,
    value = undefined,
    formik = undefined,
    label = 'Foto do usuário',
    placeholder = `Tamanho máximo 1 MB. Formatos permitidos: .png, .jpg, .gif`,
    tooltip = 'Arraste e solte um arquivo aqui ou clique para selecionar um arquivo.',
    disabled = false,
    maxSizeMB = 5,
    extensions = {
        'image/jpeg': ['.jpeg'],
        'image/png': ['.png'],
        'image/gif': ['.gif'],
    },
    rejectedFileFeedback,
    // onChange,
}) => {
    const [ files, setFiles ] = useState<CustomFile[]>([]);
    const [ isRenderized, setIsRenderized ] = useState<boolean>(false);
    const [ errorsValidation, setErrorsValidation ] = useState<string[]>([]);
    const ERRORS_MESSAGE_PTBR = useMemo(() => [
        { code: 'file-too-large', message: `Arquivo maior que o limite de ${maxSizeMB} MB` },
        { code: 'file-invalid-type', message: `Formato de arquivo inválido` }
    ],[maxSizeMB]);

    // const definePreview = useCallback(async (acceptedFiles: File[]) => {
    //     if(!(value?.name && name)) return;

    //     const acceptedFile: File = acceptedFiles[0];

    //     setFiles(acceptedFiles.map((file: File) => Object.assign(file, {
    //         preview: URL.createObjectURL(file)
    //     })));
        
    //     // transforma a imagem em base64, monta um novo objeto com o base64 
    //     // e atribui este novo objeto ao campo fotoPerfilServer do formik
    //     const fileBase64: File|string|undefined = await encodeFileToBase64(acceptedFile);
    //     if(fileBase64 != null && !formik?.values[name] /*&& !isRenderized*/) {
    //         formik.setFieldValue(name, {
    //             name: acceptedFile.name,
    //             data: fileBase64.replace('data:', '').replace(/^.+,/, ''),
    //             size: acceptedFile.size,
    //         });
    //     }
    // },[name, value?.name]);

    const definePreview = useCallback(async (acceptedFiles: File[]) => {
        if(!(value?.name && name)) return;

        // const acceptedFile: File = acceptedFiles[0];

        setFiles(acceptedFiles.map((file: File) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        /*
        // transforma a imagem em base64, monta um novo objeto com o base64 
        // e atribui este novo objeto ao campo fotoPerfilServer do formik
        const fileBase64: File|string|undefined = await encodeFileToBase64(acceptedFile);
        if(fileBase64 != null) {
            formik.setFieldValue(name, {
                name: acceptedFile.name,
                data: fileBase64.replace('data:', '').replace(/^.+,/, ''),
                size: acceptedFile.size,
            });
        }*/
    },[
        // formik,
        name, value?.name
    ]);

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        multiple: false,
        accept: extensions,
        maxSize: 1000 * 1000 * maxSizeMB,
        disabled: disabled,
        maxFiles: 1,
        onDropRejected(fileRejections: FileRejection[], event) {
            const errorCodes: string[] = fileRejections[0]?.errors.map((x: FileError) => {
                return x.code as string;
            });
            setErrorsValidation(errorCodes);
            errosFeedback(errorCodes);
        },
        onDropAccepted(files, event) {
            setErrorsValidation([]);
            errosFeedback([]);
        },
        onDrop: (acceptedFiles: File[]) => {
            const acceptedFile: File = acceptedFiles[0];
            
            if(acceptedFile.name !== value?.name) {
                definePreview(acceptedFiles);
                fillFormik(acceptedFiles);
            } else {
                if(value && files?.length === 0) {
                    const decodedFileServer: File|null = decodeBase64ToFile(
                        value.data,
                        value.name
                    );
                    if(decodedFileServer) {
                        definePreview([decodedFileServer]);
                        // setIsRenderized(true);
                    }
                }
            }
        }
    });

    const errosFeedback = useCallback((errorCodes:string[]) => {
        const errorsMessage = errorCodes.map((code: string) => ERRORS_MESSAGE_PTBR.find(
            (error: ErrosMessage) =>  code === error.code
        )?.message);

        if(rejectedFileFeedback && errorsMessage && ERRORS_MESSAGE_PTBR) {
            const message = errorsMessage.reduce((result, msg) => {
                return result += ', ' + msg
            });
            rejectedFileFeedback(message);
        }
    },[ERRORS_MESSAGE_PTBR, rejectedFileFeedback]);


    useEffect(() => {
        // if(!(value?.name && name)) return;
        // const file = formik?.values.fotoPerfilServer;
        // const file = formik?.values[name];

        if(value /*&& !isRenderized*/ && files?.length === 0) {
            const decodedFileServer: File|null = decodeBase64ToFile(
                value.data,
                value.name
            );
            if(decodedFileServer) {
                definePreview([decodedFileServer]);
                // setIsRenderized(true);
            }
        }
    },[
        definePreview,
        files?.length,
        name,
        value,
    ]);

    // useEffect(() => {
    //     if(value && !isRenderized) {
    //         const decodedFileServer: File|null = decodeBase64ToFile(
    //             value.data,
    //             value.name
    //         );
    //         if(decodedFileServer) {
    //             definePreview([decodedFileServer]);
    //             setIsRenderized(true);
    //         }
    //     }
    // },[definePreview, files?.length, isRenderized, name, value]);

    const fillFormik = useCallback(async (acceptedFiles: File[]) => {
        const acceptedFile: File = acceptedFiles[0];
        // transforma a imagem em base64, monta um novo objeto com o base64 
        // e atribui este novo objeto ao campo fotoPerfilServer do formik
        const fileBase64: File|string|undefined = await encodeFileToBase64(acceptedFile);
        if(fileBase64 != null) {
            formik.setFieldValue(name, {
                name: acceptedFile.name,
                data: fileBase64.replace('data:', '').replace(/^.+,/, ''),
                size: acceptedFile.size,
            });
        }
    },[formik, name]);
    // useEffect(() => {
    //     if(value /*&& !isRenderized*/ && files?.length === 0) {
    //         const decodedFileServer: File|null = decodeBase64ToFile(
    //             value.data,
    //             value.name
    //         );
    //         if(decodedFileServer) {
    //             definePreview([decodedFileServer]);
    //             fillFormik([decodedFileServer]);
    //             // setIsRenderized(true);
    //         }
    //     }
    // },[definePreview, files?.length, isRenderized, name, fillFormik, value]);

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => {
            files.forEach((file:any) => URL.revokeObjectURL(file.preview));

            // if(formik?.values && name) {
            //     // reseta campo de imagem no formik
            //     formik.setFieldValue(name, undefined);
            // }
        }
    }, [files]);

    return (
        <Wrapper>
            <span>{label}</span>
            <Container>
                { files?.length > 0 && (
                    <aside key={files[0].name}>
                        <img
                            src={files[0].preview}
                            // Revoke data uri after image is loaded
                            onLoad={() => { URL.revokeObjectURL(files[0].preview) }}
                            alt={files[0].name || "pré visualização da foto do perfil"}
                        />
                    </aside>
                )}
                <Wrap
                    {...getRootProps({
                        className: `dropzone ${files?.length === 0 ? 'empty' : ''}`,
                        isFocused,
                        isDragAccept,
                        isDragReject,
                        // onChange,
                    })}
                    title={!disabled ? tooltip : ''}
                    aria-label={`${label}. ${tooltip}`}
                >
                    <input {...getInputProps()} />
                    {/* <input {...getInputProps({ onChange: () => alert() })} /> */}
                </Wrap>
            </Container>
            <small>{placeholder}</small>
        </Wrapper>
    );
}

export default InputSingleFileUpload;