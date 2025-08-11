import type { ReactNode } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import './modal.css'

interface modalProps {
  component: ReactNode
}

function Modal({component}: modalProps) {
  return (
    <>
      <Popup
        trigger={
          <button className="">
            Saiba Mais
          </button>
        }
        modal
      >
        {component}
      </Popup>
    </>
  )
}

export default Modal