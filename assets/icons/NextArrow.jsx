import React from 'react'

export const NextArrow = ({ size = 24, ...props }) => (
<svg width="20" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.18571 9C8.46186 9 8.68571 9.22386 8.68571 9.5V14.7121C8.68571 15.1685 9.24682 15.3863 9.55473 15.0495L15.6915 8.33738C15.8662 8.14636 15.8662 7.85364 15.6915 7.66262L9.55473 0.950484C9.24682 0.613706 8.68571 0.831548 8.68571 1.28787V6.5C8.68571 6.77614 8.46186 7 8.18571 7H0.500001C0.223858 7 0 7.22386 0 7.5V8.5C0 8.77614 0.223858 9 0.5 9H8.18571Z" fill={props.color}/>
</svg>
)