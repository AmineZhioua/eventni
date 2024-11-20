import { convertFileToUrl } from '@/lib/utils'
import React, { Dispatch, SetStateAction, useCallback } from 'react'
import {useDropzone} from 'react-dropzone'
import { FileWithPath } from 'react-dropzone'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { Button } from '../ui/button'
import Image from 'next/image'

type FileUploaderProps = {
    onFieldChange: (value: string) => void,
    imageUrl: string,
    setFiles: Dispatch<SetStateAction<File[]>>
}

const FileUploader = ({ onFieldChange, imageUrl, setFiles }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles);
        onFieldChange(convertFileToUrl(acceptedFiles[0]));
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: generateClientDropzoneAccept(['image/*']),
    });

  return (
    <div {...getRootProps()} className='flex justify-center text-center border'>
      <input {...getInputProps()} />
      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center justify-center items-center flex-col py-5 text-grey-500">
          <Image src="/assets/icons/upload.svg" width={50} height={50} alt="file upload" className='relative left-1/2 -translate-x-1/2' />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  )
}


export default FileUploader;