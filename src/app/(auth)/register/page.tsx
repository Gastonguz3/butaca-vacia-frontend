"use client";
import Link from "next/link";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const page = () => {
  return (
    <section className="flex flex-col min-h-[70vh] items-center justify-center bg-linear-to-tr from-black via-amber-900 to-yellow-700 text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold ">Crea Tu Perfil</h1>
      <p className="mt-3 text-gray-300 font-semibold text-center px-4">Hay una butaca vacía reservada para vos, ocupá tu lugar entre quienes aman el cine</p>
      <div className="rounded-lg border-black bg-white/20 w-[90%] md:w-[70%] lg:w-[40%] mt-5 px-3 py-5 ">
        {/*Formulario */}

        <form action="" className="space-y-4">
          {/* Username */}

           <label className="font-medium text-gray-200">Nombre de Usuario</label>
          <div className="relative">
            <FaUser className=" absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="tuUsuario"
              className="flex bg-black/20 pl-10 pr-3 py-1 w-full mt-2 focus:outline-none "
            />
          </div>

          {/*Email */}
          <label className="font-medium text-gray-200">Email</label>
          <div className="relative">
            <MdEmail size={20} className=" absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="tuemail@gmail.com"
              className="flex bg-black/20 pl-10 pr-3 py-1 w-full mt-2 focus:outline-none "
            />
          </div>
          {/*Contraseña */}
          <label className="font-medium text-gray-200">Contraseña</label>
          <div className="relative">
            <FaLock className=" absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              placeholder="*********"
              className="flex bg-black/20 pl-10 pr-3 py-1 w-full mt-2 focus:outline-none"
            />
          </div>
          {/*Boton de envio */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:w-1/2 rounded-full bg-yellow-600 py-2 font-semibold mt-3 hover:scale-110 hover:bg-yellow-500 transition duration-300 cursor-pointer "
            >
              Crear Cuenta
            </button>
          </div>
          {/* OR 
              <div className="flex items-center my-3">
                <div className="grow border-t "> </div>
                <span className="shrink mx-4">OR</span>
                <div className="grow border-t"></div>
              </div>*/}
        </form>
        <div className="flex mt-6 gap-1 text-sm md:text-base justify-end">
          <p>¿Ya tenes cuenta?</p>
          <Link
            href="/login"
            className="font-semibold hover:text-yellow-400 cursor-pointer"
          >
            Ingresa
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
