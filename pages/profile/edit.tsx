import Button from '@components/button'
import Input from '@components/input'
import Layout from '@components/layout'
import useMutation from '@libs/client/useMutation'
import useUser from '@libs/client/useUser'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface EditProfileForm {
  name?: string
  email?: string
  phone?: string
  avatar?: FileList
  formErrors?: string
}

interface EditProfileResponse {
  ok: boolean
  error?: string
}

const EditProfile: NextPage = () => {
  const router = useRouter()
  const { user } = useUser()
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditProfileForm>()
  useEffect(() => {
    if (user?.name) setValue('name', user.name)
    if (user?.email) setValue('email', user.email)
    if (user?.phone) setValue('phone', user.phone)
  }, [user, setValue])
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`)
  const onValid = async ({ name, email, phone, avatar }: EditProfileForm) => {
    if (loading) return
    if (name === '' && email === '' && phone === '') {
      return setError('formErrors', {
        message: 'Please enter an email or phone number',
      })
    }
    if (avatar && avatar.length > 0) {
      // ask for cloudflare url
      const { id, uploadURL } = await (await fetch('/api/files')).json()
      const form = new FormData()
      form.append('file', avatar[0], user?.id + '')
      await fetch(uploadURL, {
        method: 'POST',
        body: form,
      })
      // upload file to cloudflare url
      return
      editProfile({
        name,
        email,
        phone,
        // avatarUrl: cloudflareUrl
      })
    } else {
      editProfile({
        name,
        email,
        phone,
      })
    }
  }
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError('formErrors', { message: data.error })
    }
  }, [data, setError])
  useEffect(() => {
    if (data?.ok === true) {
      router.push(`/profile`)
    }
  }, [data, router])
  const [avatarPreview, setAvatarPreview] = useState('')
  const avatar = watch('avatar')
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0]
      setAvatarPreview(URL.createObjectURL(file))
    }
  }, [avatar])
  return (
    <Layout canGoBack title="프로필 수정">
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-14 h-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            앨범에서 선택
            <input
              {...register('avatar')}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register('name')}
          required={false}
          label="닉네임"
          name="name"
          type="text"
        />
        <Input
          register={register('email')}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register('phone')}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-500 font-medium text-center block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text={loading ? '로딩중...' : '수정하기'} />
      </form>
    </Layout>
  )
}

export default EditProfile
