/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { Link } from 'react-router-dom'

type Props = {
  className: string
  color: string
  svgIcon: string
  iconColor: string
  title: string
  titleColor?: string
  description: string
  descriptionColor?: string
  location: string
}

const UniversityWidget: React.FC<Props> = ({
  className,
  color,
  svgIcon,
  iconColor,
  title,
  titleColor,
  description,
  descriptionColor,
  location,
}) => {
  return (
    <Link to={location} className={`card bg-${color} hoverable ${className}`}>
      <div className='card-body'>
        <KTSVG path={svgIcon} className={`svg-icon-${iconColor} svg-icon-3x ms-n1`} />

        <div className={`text-${titleColor} fw-bold fs-1 mb-2 mt-5`}>{title}</div>

        <div className={`fw-semibold fs-5 text-${descriptionColor}`}>{description}</div>
      </div>
    </Link>
  )
}

export {UniversityWidget}
