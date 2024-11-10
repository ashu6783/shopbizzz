import React from "react";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div>
      <div className="text-center pt-8 text-2xl border-t">
        <Title text1={"CONTACT"} text2={"US"} />
        <div className="my-10 flex flex-col md:flex-row gap-16">
          <img className="w-full md:max-w-[450px]" src="./contact.png" alt="" />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
            <p className="text-xl" >
              At Shop-Bizz, we value your feedback and are here to assist you
              with any inquiries or concerns you may have. Whether you need help
              with an order, have questions about our products, or want to share
              your shopping experience with us, we're here to help.
            </p>
            <b className="text-2xl">Get in Touch:</b>
            <ul className="text-xl">
              <li>
                <b>Customer Service:</b>
              </li>
              <ul>
                <li>
                  <b>Email:</b>{" "}
                  <a href="mailto:ashu00665@gmail.com">
                    ashu00665@gmail.com
                  </a>
                </li>
                <li>
                  <b>Phone:</b> +91 8303361090
                </li>
                <li>
                  <b>Instagram Handle:</b>{" "}
                  <a href="https://www.instagram.com/_ashu91/">
                    ashu91
                  </a>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Contact;
