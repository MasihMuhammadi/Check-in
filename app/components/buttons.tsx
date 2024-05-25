"use client";
import React, { ReactElement } from "react"
interface CustomButtonInterface {
  children: any
  clickHandler?: Function
  style?: string
  primary?: boolean
  secondary?: boolean
  disabled?: boolean
  type?: "button" | "submit" | "reset" | undefined
}
const Buttons = ({
  clickHandler,
  style,
  children,
  primary,
  secondary,
  disabled,
  type,
}: CustomButtonInterface) => {

  return (
    <>
      <button
        onClick={(params) => {
          if (!disabled && clickHandler) {
            clickHandler(params)
          }
        }}
        type={type ? type : "button"}
        disabled={disabled}

        className={`flex justify-center items-center rounded-xl transition-colors duration-500  py-2 ${style} ${primary
          ? "text-white hover:text-primary active:text-white hover:bg-white bg-primary active:bg-secondary border border-primary active:border-primary "
          : secondary
            ? "bg-white border border-primary hover:bg-primary hover:text-white active:bg-secondary hover:border-primary active:border-primary active:text-white"
            : disabled &&
            "bg-gray-700 text-white border border-gray-700 cursor-not-allowed"
          } ${style}`}
      >
        {children}
      </button>
    </>
  )
}

export default Buttons
