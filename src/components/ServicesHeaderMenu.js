import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

export default function ServicesHeaderMenu(props) {
  const { services, uri } = props

  return (
    <div className="flex flex-col sm:flex-row mb-[50px] flex-wrap">
      {services?.map((service, index) => {
        return (
          <div key={index}>
            <Link
              className={clsx(
                uri === 'services/' + service?.slug && '!border-b-[2px]',
                'uppercase mr-[45px] !text-[#ea5c44] !border-b-0 hover:!border-b-[2px] !border-b-[#062995] '
              )}
              href={'/services/' + service?.slug}>
              {service?.title?.rendered}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
