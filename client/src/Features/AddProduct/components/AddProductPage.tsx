import React from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { type Product } from '../type'
import { useAppDispatch, type RootState } from '../../../store/store'
import { useSelector } from 'react-redux'
import { addProduct } from '../../Products/productSlice'

const schema = object().shape({
  title: string().required('Необходимо указать название')
    .max(80, 'Название должно быть не более 80 символов'),
  description: string().required('Необходимо указать описание'),
  category: string()
    .required('Необходимо указать категорию'),
  images: string()
    .required('Необходимо добавить хотя бы одну фотографию')
})

function AddProductPage (): JSX.Element {
  const dispatch = useAppDispatch()
  const message = useSelector((store: RootState) => store.auth.message)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Product>({
    resolver: yupResolver(schema)
  })

  const productPost: SubmitHandler<Product> = (data: Product) => {
    dispatch(addProduct(data))
      .catch(console.log)
  }

  return (
    <div className='center-container'>
      <form onSubmit={handleSubmit(productPost)}>
        <input type="text" placeholder='Название' {...register('title')}/>
        <input type="text" placeholder='Описание' {...register('description')} />
        <input type="text" placeholder='Категория' {...register('category')} />
        <input type="text" placeholder='Фотографии' {...register('images')} />
        {errors.title && <span>{errors.title?.message}</span>}
        {errors.description && <span>{errors.description.message}</span>}
        {errors.category && <span>{errors.category.message}</span>}
        {errors.images && <span>{errors.images.message}</span>}

        <span>{message}</span>
        <button type='button'>Добавить</button>
      </form>
    </div>
  )
}

export default AddProductPage
