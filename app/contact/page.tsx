import ContactForm from '@/components/ContactForm';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const ContactPage = async() => {

  return (
    <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto pt-20">
          <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
                  Contact Us
              </h1>
              <p className="text-xl text-gray-600">
                  Feel free to send us a message. We appreciate it!
              </p>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-10">
              <ContactForm />
          </div>
      </div>
    </section>
  );
}

export default ContactPage;