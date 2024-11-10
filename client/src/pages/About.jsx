import React from "react";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src="./about.png" alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <b className="text-2xl">About Shop-Bizz</b>
          <p>
            Welcome to Shop-Bizz, your premier destination for a seamless and
            enjoyable online shopping experience. Our mission is to bring you
            the best products, exceptional service, and unbeatable
            convenience—all in one place.
          </p>
          <b className="text-2xl">Who We Are</b>
          <p>
            At Shop-Bizz, we are a passionate team of innovators, dreamers, and
            doers, dedicated to transforming the way you shop online. With years
            of expertise in the e-commerce industry, we have meticulously
            curated a diverse range of products that cater to your every need
            and desire. From the latest fashion trends and cutting-edge
            electronics to unique home decor and essential everyday items, we
            have something for everyone.
          </p>
        </div>
      </div>
      <hr />
      <div>
        <br />
        <br />
        <b className="text-2xl text-gray-600">Our Promise</b>
        <p>
            
          We understand that shopping online should be more than just a
          transaction—it should be an experience. That's why we are committed to
          offering:
          <ul>
            <li>
              <b>Quality Products:</b> We partner with reputable brands and
              suppliers to ensure that every product meets our high standards of
              quality and excellence.
            </li>
            <li>
              <b>Exceptional Service:</b> Our customer support team is always
              ready to assist you with any questions, concerns, or special
              requests. Your satisfaction is our top priority.
            </li>
            <li>
              <b>Fast & Reliable Shipping:</b> With our efficient logistics
              network, we strive to deliver your orders promptly and securely,
              no matter where you are.
            </li>
          </ul>
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <b className="text-2xl  text-gray-600">Our Vision</b>
        <p>
          We envision a world where online shopping is effortless, enjoyable,
          and accessible to everyone. As we continue to grow, we remain
          steadfast in our commitment to innovation, sustainability, and
          customer satisfaction. At Shop-Bizz, we’re not just building a
          store—we’re creating a community where shoppers can discover new
          products, connect with like-minded individuals, and enjoy a truly
          personalized shopping experience.
        </p>
        <br />
        <br />
        <hr />
        <br />
        <br />
        <b className="text-2xl  text-gray-600">Join Us!</b>
        <p>
          Thank you for choosing Shop-Bizz. We invite you to explore our wide
          selection of products, take advantage of our exciting offers, and
          experience the future of online shopping today.
        </p>
        <br />
        <br />
        <hr />
      </div>
    </div>
  );
};

export default About;
