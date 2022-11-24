import React, { useRef, useState, useEffect } from "react";
import "./styles.css";

export default function Dial({
  setDialValue,
  defaultStart = 0,
  startCenter = false,
}) {
  const dialRef = useRef(null);
  const perilla = useRef(null);
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    dialRef.current.boton = 0;
    dialRef.current.refX = 0;
    const calculatePosition = (e) => {
      const puntoX = e.clientX;
      if (dialRef.current?.boton === 1) {
        if (puntoX > dialRef.current.refX) {
          setValue((prev) => {
            setDialValue(prev + 2);
            return prev <= 127 ? prev + 2 : prev;
          });
        } else if (puntoX < dialRef.current.refX) {
          setValue((prev) => {
            setDialValue(prev - 2);
            return prev >= 2 ? prev - 2 : prev;
          });
        }
        dialRef.current.refX = puntoX;
      }
    };

    if (startCenter) {
      perilla.current.style.transform = `rotate(135deg)`;
      setValue(64);
    }

    window.addEventListener("mousemove", calculatePosition);
  }, []);

  useEffect(() => {
    if (selected) {
      rotate(value);
    }
  }, [selected, value]);

  const rotate = (medida = 1) => {
    if (medida * 2.81 < 270)
      perilla.current.style.transform = `rotate(${medida * 2.81}deg)`;
  };

  return (
    <div
      onMouseDown={() => {
        setSelected(true);
        dialRef.current.boton = 1;
        dialRef.current.refX = 0;
      }}
      onMouseUp={() => {
        dialRef.current.boton = 0;
        setSelected(false);
        dialRef.current.refX = 0;
      }}
      onMouseLeave={() => {
        setSelected(false);
        dialRef.current.boton = 0;
        dialRef.current.refX = 0;
      }}
      ref={dialRef}
      className="pote"
    >
      <div ref={perilla}></div>
    </div>
  );
}
