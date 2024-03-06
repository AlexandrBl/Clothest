/* eslint-disable @typescript-eslint/no-misused-promises */

import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { type CustomFileType, type Product } from '../type'
import { useAppDispatch, type RootState } from '../../../store/store'
import { useSelector } from 'react-redux'
import { addProduct } from '../../Products/productSlice'

const schema = object().shape({
  title: string().required('Необходимо указать название').max(80, 'Название должно быть не более 80 символов'),
  description: string().required('Необходимо указать описание'),
  category: string().required('Необходимо указать категорию')
})

function AddProduct (): JSX.Element {
  const dispatch = useAppDispatch()

  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<CustomFileType[]>([])

  const message = useSelector((store: RootState) => store.products.message)
  const categories = useSelector((store: RootState) => store.products.categories)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Product>({
    resolver: yupResolver(schema)
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages((images) => [...images, ...acceptedFiles])
    setPreviews((previewfiles) => {
      const newFiles = acceptedFiles.map(file => Object.assign(file, { pic: URL.createObjectURL(file) }))
      return [...previewfiles, ...newFiles]
    }
    )
  }, [images])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const productPost: SubmitHandler<Product> = (data: Product) => {
    const formData = new FormData()
    for (const image of images) {
      formData.append('images', image)
    }
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('category', data.category)
    dispatch(addProduct(formData))
      .catch(console.log)
  }

  useEffect(() => {
    if (message === 'Продукт успешно добавлен') {
      reset()
      setImages([])
      setPreviews([])
    }
  }, [message])

  const deleteImage = (preview: CustomFileType): void => {
    setImages((images) => images.filter((image) => image.name !== preview.name))
    setPreviews((previewfiles) => previewfiles.filter((file) => file.name !== preview.name))
  }

  return (
    <div className='center-container addProduct-container'>
      <form className='addProduct-container__form' onSubmit={handleSubmit(productPost)}>
        <input type="text" placeholder='Название' {...register('title')} />
        <span>{errors.title?.message}</span>
        <input type="text" placeholder='Описание' {...register('description')} />
        <span>{errors.description?.message}</span>
        <select defaultValue='default' {...register('category')}>
                <option value='default'>Выберите категорию</option>
               {categories.map(el => <option key={el.id} value={el.title}>{el.title}</option>)}
        </select>
        <span>{errors.category?.message}</span>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p className='drag-n-drop-p'>Drag and drop some files here, or click to select files</p>
        </div>
        {images.length > 0 && (
          <div className='previews-container'>
            <p className='previews-container-p'>Прикрепленные файлы:</p>
              <div className='preview-common-container'>
              {previews.map(preview => (
                <div className='preview-container' key={preview.name} onClick={() => { deleteImage(preview) }}>
                  <div className='preview-container__inner'>
                    <img src={preview.pic} className='preview-container__image' onLoad={() => { URL.revokeObjectURL(preview.pic) }}/>
                    <div className='preview-container__image-delete'><p className='preview-container__image-delete-p'>Удалить фотографию</p></div>
                  </div>
                </div>
              ))}
              </div>
          </div>
        )}
        <button type='submit'>Добавить</button>
      </form>
    </div>
  )
}

export default AddProduct
