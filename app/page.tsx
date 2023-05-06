"use client"
import dice from '../public/dice.png'
import { useEffect, useState, createRef } from 'react'
import React from 'react'

export default function Home() {
  const [arrayBuffer, setArrayBuffer] = useState<Uint8Array>(new Uint8Array([0,0,0,0]));

  const imageRef = createRef<HTMLImageElement>()

  useEffect(() => {
    fetch(dice.src)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const uint8array = new Uint8Array(buffer);
      setArrayBuffer(uint8array);
    })
  },[])

  useEffect(() => {
    // create a blob from arraybuffer
    const blob = new Blob([arrayBuffer], {type: 'image/png'});
    // create a url for the blob
    const url = URL.createObjectURL(blob);
    if (imageRef && imageRef.current) {
      imageRef.current.src = url
    }
  }, [arrayBuffer]);

  return (
    <div>
      <h1>Next Playground</h1>
      <p>Task: Convert a PNG to an ArrayBuffer, create a blob from the buffer and set it to a URL</p>
      <img ref={imageRef} alt="colored, four sided dice"/>
    </div>
  )
}
