const Contacts = () => {
  return (
    <main className="grid gap-4">
      <h1 className="font-light text-4xl">Contact Us</h1>
      <p>
        We&apos;re here to help. Visit our other guide pages or reach out to our
        response team to get all the answers you need.
      </p>
      <div className="grid lg:grid-cols-2 gap-4 items-start">
        <div className="grid gap-4">
          <h2 className="font-light text-3xl">Chat or Call</h2>
          <p>
            Let&apos;s speed things up. Live chat or call our response team. You
            can also order products or reach out to know the progress via chat
            or call.
          </p>
          <a href="tel:+254722379620">
            <p className=" text-primary">0722379620</p>
          </a>
        </div>
        <div className="grid gap-4">
          <h2 className="font-light text-3xl">Email</h2>
          <p>Email our response team:</p>
          <p className="text-primary">
            <a href="mailto:falconelectronics@gmail.com">falconelectronics@gmail.com</a>
          </p>
        </div>
      </div>
      <div className="grid gap-4 ">
        <h2 className="font-light text-3xl">Timelines</h2>
        <div className="grid space-y-4">
          <p>Monday - Friday</p>
          <p>8:00am - 10:00pm EAT</p>
        </div>
        <div className="grid space-y-4">
          <p>Saturday - Sunday</p>
          <p>8:00am - 8:00pm EAT</p>
        </div>
      </div>
    </main>
  );
};

export default Contacts;
