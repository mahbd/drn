"use client";

import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  useForm,
} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { ReactNode, useState } from "react";
import { ZodObject } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@/components/MDEditor";
import Spinner from "@/components/Spinner";

const reformatString = (str: string) => {
  str = str.replace(/([A-Z])/g, " $1").trim();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const useFormComponents = <T extends FieldValues>(
  resolver: ZodObject<FieldValues>,
  defaultValues?: DefaultValues<T>,
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<T>({ resolver: zodResolver(resolver), defaultValues });

  interface InputProps {
    name: Path<T>;
    label?: string | null;
    placeholder?: string;
    type?: "text" | "email" | "datetime-local" | "number";
  }

  const Input = ({ name, label, placeholder, type }: InputProps) => {
    let extraArgs = {};
    if (type === "datetime-local") {
      extraArgs = {
        valueAsDate: true,
      };
    } else if (type === "number") {
      extraArgs = {
        valueAsNumber: true,
      };
    }
    return (
      <div className="form-control">
        {label !== null && (
          <label className="label">
            <span className="label-text">
              {label ? label : reformatString(name)}
            </span>
          </label>
        )}
        <input
          className={`input input-sm input-bordered ${
            errors[name] ? "input-error" : ""
          }`}
          type={type || "text"}
          placeholder={placeholder}
          {...register(name, extraArgs)}
        />
        <ErrorMessage>{errors[name]?.message as ReactNode}</ErrorMessage>
      </div>
    );
  };

  interface TextAreaProps {
    name: Path<T>;
  }

  const Textarea = ({ name }: TextAreaProps) => (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{reformatString(name)}</span>
      </label>
      <textarea
        className={`textarea textarea-bordered ${
          errors[name] ? "textarea-error" : ""
        }`}
        {...register(name)}
      />
      <ErrorMessage>{errors[name]?.message as ReactNode}</ErrorMessage>
    </div>
  );

  const CheckBox = ({ name, label }: { name: Path<T>; label?: string }) => (
    <div className="flex">
      <label className="label">
        <input
          className="checkbox rounded-sm checkbox-sm checkbox-primary me-3"
          type="checkbox"
          {...register(name)}
        />
        {label}
      </label>
      <ErrorMessage>{errors[name]?.message as ReactNode}</ErrorMessage>
    </div>
  );

  interface SelectProps {
    name: Path<T>;
    label?: string;
    items: { [key: string]: any }[];
    valueKey?: string;
    labelKey?: string;
  }

  const Select = ({ name, label, items, valueKey, labelKey }: SelectProps) => (
    <div className="form-control w-full my-5">
      <select className="select select-sm select-bordered" {...register(name)}>
        <option value={""}>Select a {label || reformatString(name)}</option>
        {items.map((item) => (
          <option
            key={item[valueKey || "value"]}
            value={item[valueKey || "value"]}
          >
            {item[labelKey || "label"]}
          </option>
        ))}
      </select>
      <ErrorMessage>{errors[name]?.message as ReactNode}</ErrorMessage>
    </div>
  );

  interface EditorProps {
    name: Path<T>;
    label?: string | null;
  }

  const Editor = ({ name, label }: EditorProps) => (
    <div className="form-control">
      {label !== null && (
        <label className="label">
          <span className="label-text">
            {label ? label : reformatString(name)}
          </span>
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <MDEditor
              name={field.name}
              onChange={field.onChange}
              value={field.value}
            />
          );
        }}
      />
      <ErrorMessage>{errors[name]?.message as ReactNode}</ErrorMessage>
    </div>
  );

  const SubmitBtn = ({ label }: { label: string }) => (
    <div className="flex justify-center">
      <button
        type="submit"
        className="btn btn-primary btn-sm my-5"
        disabled={isSubmitting}
      >
        {isSubmitting && <Spinner />} {label}
      </button>
    </div>
  );
  return {
    CheckBox,
    Editor,
    Input,
    Select,
    SubmitBtn,
    Textarea,

    control,
    getValues,
    handleSubmit,
    setError,
    isSubmitting,
    setIsSubmitting,
    setValue,
  };
};

export default useFormComponents;
