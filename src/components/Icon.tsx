import * as React from 'react'

interface IProps {
  name: string
  color?: string
  height?: number
  width?: number
  isOpen?: boolean
  [x: string]: any
}

const Icon = ({ name, color, circleColor, arrowColor, height, isOpen, className, width, ...rest }: IProps) => {
  switch (name) {
    case 'delete':
      return (
        <svg
          className={className}
          role="button"
          tabIndex={0}
          aria-labelledby="delete-icon-title"
          x="0px"
          y="0px"
          viewBox="0 0 268.476 268.476"
          style={{ height: `${height}rem` }}
          {...rest}
        >
          <title id="delete-icon-title">Delete</title>
          <g>
            <path
              style={{ fillRule: 'evenodd', clipRule: 'evenodd', fill: `${color}` }}
              d="M63.119,250.254c0,0,3.999,18.222,24.583,18.222h93.072c20.583,0,24.582-18.222,24.582-18.222l18.374-178.66H44.746L63.119,250.254z M170.035,98.442c0-4.943,4.006-8.949,8.949-8.949c4.943,0,8.95,4.006,8.95,8.949l-8.95,134.238c0,4.943-4.007,8.949-8.949,8.949c-4.942,0-8.949-4.007-8.949-8.949L170.035,98.442zM125.289,98.442c0-4.943,4.007-8.949,8.949-8.949c4.943,0,8.949,4.006,8.949,8.949v134.238c0,4.943-4.006,8.949-8.949,8.949c-4.943,0-8.949-4.007-8.949-8.949V98.442z M89.492,89.492c4.943,0,8.949,4.006,8.949,8.949l8.95,134.238c0,4.943-4.007,8.949-8.95,8.949c-4.942,0-8.949-4.007-8.949-8.949L80.543,98.442C80.543,93.499,84.55,89.492,89.492,89.492zM218.36,35.811h-39.376V17.899C178.984,4.322,174.593,0,161.086,0L107.39,0C95.001,0,89.492,6.001,89.492,17.899v17.913H50.116c-7.914,0-14.319,6.007-14.319,13.43c0,7.424,6.405,13.431,14.319,13.431H218.36c7.914,0,14.319-6.007,14.319-13.431C232.679,41.819,226.274,35.811,218.36,35.811z M161.086,35.811h-53.695l0.001-17.913h53.695V35.811z"
            />
          </g>
        </svg>
      )

    case 'arrow':
      return (
        <svg
          className={className}
          viewBox="0 0 20 20"
          preserveAspectRatio="none"
          width={16}
          fill="transparent"
          stroke="#979797"
          strokeWidth="1.1px"
          transform={isOpen ? 'rotate(180)' : ''}
        >
          <path d="M1,6 L10,15 L19,6" />
        </svg>
      )

    case 'x':
      return (
        <svg
          className={className}
          viewBox="0 0 20 20"
          preserveAspectRatio="none"
          width={12}
          fill="transparent"
          stroke="#979797"
          strokeWidth="1.1px"
        >
          <path d="M1,1 L19,19" />
          <path d="M19,1 L1,19" />
        </svg>
      )
    case 'close-circle':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z" />
        </svg>
      )
    case 'close':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )

    case 'back':
      return (
        <svg
          className={className}
          width="512"
          height="512"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="512" height="512" fill="black" fillOpacity="0" />
          <circle cx="256" cy="256" r="256" fill={circleColor} />
          <rect width="358.4" height="302.193" fill="black" fillOpacity="0" transform="translate(83.6265 104.96)" />
          <rect x="93.0132" y="234.667" width="349.013" height="42.6667" rx="21.3333" fill={arrowColor} />
          <rect
            x="83.6265"
            y="255.809"
            width="213.333"
            height="42.6667"
            rx="21.3333"
            transform="rotate(-45 83.6265 255.809)"
            fill={arrowColor}
          />
          <rect
            x="113.796"
            y="226.133"
            width="213.333"
            height="42.6667"
            rx="21.3333"
            transform="rotate(45 113.796 226.133)"
            fill={arrowColor}
          />
        </svg>
      )
    case 'link':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height={height}
          width={width || 'auto'}
          className={`icon-link ${className}`}
        >
          <path
            className="secondary"
            d="M19.48 13.03l-.02-.03a1 1 0 1 1 1.75-.98A6 6 0 0 1 16 21h-4a6 6 0 1 1 0-12h1a1 1 0 0 1 0 2h-1a4 4 0 1 0 0 8h4a4 4 0 0 0 3.48-5.97z"
          />
          <path
            className="primary"
            d="M4.52 10.97l.02.03a1 1 0 1 1-1.75.98A6 6 0 0 1 8 3h4a6 6 0 1 1 0 12h-1a1 1 0 0 1 0-2h1a4 4 0 1 0 0-8H8a4 4 0 0 0-3.48 5.97z"
          />
        </svg>
      )
    case 'heart':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height={height}
          width={width || 'auto'}
          className={`icon-heart ${className}`}
        >
          <circle cx="12" cy="12" r="10" className="primary" />
          <path
            className="secondary"
            d="M12.88 8.88a3 3 0 1 1 4.24 4.24l-4.41 4.42a1 1 0 0 1-1.42 0l-4.41-4.42a3 3 0 1 1 4.24-4.24l.88.88.88-.88z"
          />
        </svg>
      )
    case 'airplane':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height={height}
          width={width || 'auto'}
          className={`icon-airplane ${className}`}
        >
          <path
            className="secondary"
            d="M19 11.9l2.7 1.14c.18.08.3.26.3.46v2a.5.5 0 0 1-.6.49L12 14 2.6 16a.5.5 0 0 1-.6-.49v-2c0-.2.12-.38.3-.46L5 11.9V10a1 1 0 1 1 2 0v1.06l4.8-2.02a.5.5 0 0 1 .4 0l4.8 2.02V10a1 1 0 0 1 2 0v1.9z"
          />
          <path className="primary" d="M12 2a2 2 0 0 1 2 2v8l-1 8h-2l-1-8V4c0-1.1.9-2 2-2z" />
          <path
            className="secondary"
            d="M8.64 22.98c-.32.1-.64-.17-.64-.54v-1.1c0-.19.08-.35.2-.46l3.5-2.78c.18-.13.42-.13.6 0l3.5 2.78c.12.1.2.27.2.45v1.11c0 .37-.32.64-.64.54L12 21.9l-3.36 1.07z"
          />
        </svg>
      )
    case 'medal':
      return (
        <svg
          height={height}
          width={width || 'auto'}
          viewBox="0 0 15 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`icon-medal ${className}`}
        >
          <path
            className="secondary"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.1214 0H0.130706V11.9783H0.118498L0.130706 11.9858V11.9907H0.138713L5.76686 15.4374L4.64943 18.4531L0 18.4909L3.73686 20.9916L2.33993 25L6.126 22.5605L9.91208 25L8.51515 20.9916L12.252 18.4909L7.60258 18.4531L6.48511 15.4372L12.1131 11.9907H12.1214V11.9856L12.1333 11.9783H12.1214V0ZM4.83819 11.9783H4.83749V1.0405H7.46355V11.9907H7.46425V13.7248H4.83819V11.9783ZM4.84228 13.7249L6.15103 14.4681L7.45979 13.7249L4.84228 13.7249Z"
          />
        </svg>
      )
    case 'user-couple':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height={height}
          width={width || 'auto'}
          className={`icon-user-couple ${className}`}
        >
          <path
            className="primary"
            d="M15 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7 8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
          />
          <path
            className="secondary"
            d="M9 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7 8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
          />
        </svg>
      )
    case 'chat-group-alt':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height={height}
          width={width || 'auto'}
          className={`icon-chat-group-alt ${className}`}
        >
          <rect width="16" height="13" x="2" y="2" className="secondary" rx="2" />
          <path
            className="primary"
            d="M6 16V8c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v13a1 1 0 0 1-1.7.7L16.58 18H8a2 2 0 0 1-2-2z"
          />
        </svg>
      )
    case 'chevron-right-circle':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height={height}
          width={width || 'auto'}
          className={`icon-cheveron-right-circle ${className}`}
        >
          <circle cx="12" cy="12" r="10" className="primary" />
          <path
            className="secondary"
            d="M10.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4l3.29-3.3-3.3-3.3z"
          />
        </svg>
      )
    case 'circle':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height={height}
          width={width || 'auto'}
          className={`icon-circle ${className}`}
        >
          <circle cx="12" cy="12" r="10" className="circle" />
        </svg>
      )

    default:
      return null
  }
}

export default Icon
