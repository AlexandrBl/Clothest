/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { type Product } from '../type';
import { useAppDispatch, type RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { addProduct } from '../../Products/productSlice';

const schema = object().shape({
  title: string().required('Необходимо указать название').max(80, 'Название должно быть не более 80 символов'),
  description: string().required('Необходимо указать описание'),
  category: string().required('Необходимо указать категорию'),
});

function AddProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [images, setImages] = useState<File[]>([]);
  const message = useSelector((store: RootState) => store.products.message);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Product>({
    resolver: yupResolver(schema),
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages(acceptedFiles);
    setValue('images', acceptedFiles);
  }, [setValue]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  const productPost: SubmitHandler<Product> = (data: Product) => {
    const formData = new FormData();
    for (const key in images) {
      formData.append('images', images[key]);
    }
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);

    dispatch(addProduct(formData))
      .catch(console.log);
  };

  return (
    <div className='center-container addProduct-container'>
      <form className='addProduct-container__form' onSubmit={handleSubmit(productPost)}>
        <input type="text" placeholder='Название' {...register('title')} />
        <span>{errors.title?.message}</span>
        <input type="text" placeholder='Описание' {...register('description')} />
        <span>{errors.description?.message}</span>
        <input type="text" placeholder='Категория' {...register('category')} />
        <span>{errors.category?.message}</span>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p className='drag-n-drop-p'>Drag 'n' drop some files here, or click to select files</p>
        </div>
        {images.length > 0 && (
          <div>
            <h4>Selected Files:</h4>
            <ul>
              {images.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
        <span>{message}</span>
        <button type='submit'>Добавить</button>
      </form>
    </div>
  );
}

export default AddProductPage;
