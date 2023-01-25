import Swal from 'sweetalert2'

type buttonType = 'success' | 'error' | 'warning' | 'info' | 'question'

interface SwalProps {
  icon: buttonType
  title: string
  text: string
  textButton: string
  didClose?(): void
}

const defaults: Pick<SwalProps, 'icon' | 'title' | 'textButton'> = {
  icon: 'success',
  title: 'Oops!',
  textButton: 'OK'
}

export default function () {
  const showNotification = (options: Partial<SwalProps>): void => {
    const props = { ...defaults, ...options }

    Swal.fire({
      position: 'center',
      icon: props.icon,
      title: props.title,
      text: props.text,
      showConfirmButton: true,
      confirmButtonText: props.textButton,
      didClose: props.didClose
    })
  }

  return {
    showNotification
  }
}
