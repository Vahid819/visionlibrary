"use client";

import SectionHeader from "./SectionHeader";
import PhotoUpload from "./PhotoUpload";
import FormField from "./FormField";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import TextareaInput from "./TextareaInput";

export default function Step1PersonalInfo({ form, errors, onChange, onPhotoChange }) {
  return (
    <div>
      <SectionHeader
        icon="👤"
        title="Personal Information"
        subtitle="Basic details about the student"
      />

      <div className="px-6 pb-6">
        {/* Photo upload */}
        <PhotoUpload
          preview={form.photoPreview}
          onPreview={(url) => onPhotoChange(url)}
        />

        <div className="grid grid-cols-2 gap-3.5">

          {/* First Name */}
          <FormField label="First Name" required error={errors.firstName}>
            <TextInput
              id="firstName"
              placeholder="Rahul"
              value={form.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              icon="✦"
              error={errors.firstName}
            />
          </FormField>

          {/* Last Name */}
          <FormField label="Last Name" required error={errors.lastName}>
            <TextInput
              id="lastName"
              placeholder="Sharma"
              value={form.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              icon="✦"
              error={errors.lastName}
            />
          </FormField>

          {/* Phone */}
          <FormField label="Phone Number" required error={errors.phone}>
            <TextInput
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              icon="📱"
              error={errors.phone}
            />
          </FormField>

          {/* Email */}
          <FormField label="Email Address">
            <TextInput
              id="email"
              type="email"
              placeholder="rahul@gmail.com"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
              icon="✉"
            />
          </FormField>

          {/* DOB */}
          <FormField label="Date of Birth">
            <TextInput
              id="dob"
              type="date"
              value={form.dob}
              onChange={(e) => onChange("dob", e.target.value)}
              icon="📅"
            />
          </FormField>

          {/* Gender */}
          <FormField label="Gender">
            <SelectInput
              id="gender"
              value={form.gender}
              onChange={(e) => onChange("gender", e.target.value)}
              placeholder="Select gender"
              options={["Male", "Female", "Other", "Prefer not to say"]}
            />
          </FormField>

          {/* Address - full width */}
          <FormField label="Address" className="col-span-2">
            <TextareaInput
              id="address"
              placeholder="Street, City, State, PIN code..."
              value={form.address}
              onChange={(e) => onChange("address", e.target.value)}
              icon="📍"
              rows={3}
            />
          </FormField>

          {/* Emergency Contact Name */}
          <FormField label="Emergency Contact Name">
            <TextInput
              id="emergencyName"
              placeholder="Parent / Guardian name"
              value={form.emergencyName}
              onChange={(e) => onChange("emergencyName", e.target.value)}
              icon="🆘"
            />
          </FormField>

          {/* Emergency Contact Phone */}
          <FormField label="Emergency Contact Phone">
            <TextInput
              id="emergencyPhone"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.emergencyPhone}
              onChange={(e) => onChange("emergencyPhone", e.target.value)}
              icon="📞"
            />
          </FormField>

        </div>
      </div>
    </div>
  );
}
