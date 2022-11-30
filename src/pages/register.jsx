import Head from 'next/head'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import logoWallet from '@/images/logos/wallet.svg'
import ToastSent from '@/components/ToastSent'
import Image from 'next/image'

export default function Register() {

 const [isSending, setIsSending] = useState(false)
 const [hidden, setHidden] = useState(true)

  const handleSubmit = async (e) => {
    setIsSending(true)
    e.preventDefault()
    const data = new FormData(e.target)
    const formDataToObject = Object.fromEntries(data)
    const formDataJSON = JSON.stringify(formDataToObject)
    // implement api fetch
    const res = await fetch('/api/mail', {
      body: formDataJSON,
      method: 'POST',
      headers: {'Content-Type' : 'application/json'}
    })

    const { error } = await res.json()

    if (error) {
        console.log(error)
        return
      }
      console.log(data)
      console.log(formDataToObject)
      console.log(formDataJSON)
      console.log(res)

      setIsSending(false)
      setHidden(false)
      setTimeout(() => {
        setHidden(true)
      }, 3000)
  }

  return (
    <>
      <Head>
        <title>Contact us - Byline</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
        <Link href="/" aria-label="Home" className='flex gap-2 items-center'>
              {/* <Logo className="h-10 w-auto" /> */}
              <Image src={logoWallet} alt="logo" unoptimized />
              <p className="text-xl font-semibold text-gray-700">Byline</p>
            </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Lets have a chat
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Enter your contact details and we&apos;ll connect with you very soon.
            </p>
          </div>
        </div>
        <form

          onSubmit={handleSubmit}
          action="#"
          className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2"
        >
          <TextField

            label="First name"
            id="first_name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
          />
          <TextField
            label="Last name"
            id="last_name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            required
          />
          <TextField
            className="col-span-full"
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            className="col-span-full"
            label="Phone"
            id="phone_number"
            name="phone_number"
            type="tel"
            required
          />
          <SelectField
            className="col-span-full"
            label="How did you hear about us?"
            id="referral_source"
            name="referral_source"
          >
            <option>Search engine</option>
            <option>Referral</option>
            <option>Social media</option>
            <option>Other</option>
          </SelectField>
          <div className="col-span-full">
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              {!isSending ?
              <span>
                Send <span aria-hidden="true">&rarr;</span>
              </span>
              :
              <span>
                Sending <span aria-hidden="true">&rarr;</span>
              </span>}
            </Button>
          </div>
        </form>
        {!hidden && <ToastSent />}
      </AuthLayout>
    </>
  )
}
