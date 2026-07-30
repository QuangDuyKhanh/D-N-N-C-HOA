<!-- 3. PHẦN BANNER CHÍNH & HẠT BỤI VÀNG -->
    <section
      id="hero-section"
      class="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <!-- Golden particles bay bằng GSAP -->
      <canvas id="particles-canvas"></canvas>

      <!-- Lớp phủ tối mờ -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-darkBg z-0"
      ></div>

      <!-- Đèn chiếu sáng nghệ thuật đằng sau chai nước hoa -->
      <div class="hero-glow"></div>

      <div
        class="container mx-auto px-4 md:px-8 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12"
      >
        <!-- Cột chữ (Trái) -->
        <div
          class="lg:col-span-6 text-center lg:text-left order-2 lg:order-1"
          data-aos="fade-right"
        >
          <span
            class="text-fluid-sm font-semibold tracking-[4px] text-gold uppercase block mb-3"
            >LUXURY INSPIRED FRAGRANCE</span
          >
          <h1
            class="font-title text-fluid-hero font-bold text-white leading-tight mb-4"
          >
            Define Your <br class="hidden md:inline" />
            <span class="text-gold">Signature Scent</span>
          </h1>
          <p
            class="text-fluid-base text-gray-300 max-w-xl mb-8 font-light mx-auto lg:mx-0"
          >
            DOCI Perfume delivers high-end fragrances inspired by iconic world perfumes. Enjoy 6–8 hours longevity and exquisite designs that elevate your style.
          </p>
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start relative z-20"
          >
            <a href="#collections-section" class="btn-luxury btn-luxury-solid"
              >SHOP NOW</a
            >
            <a href="#quiz-section" class="btn-luxury">FIND YOUR SCENT</a>
          </div>
        </div>

        <!-- Cột ảnh chai nước hoa lớn (Phải) -->
        <div
          class="lg:col-span-6 flex justify-center items-center order-1 lg:order-2"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div
            class="relative w-full max-w-md md:max-w-lg lg:max-w-xl aspect-square flex items-center justify-center float-element rounded-2xl overflow-hidden border border-gold/30 shadow-2xl bg-black/40 hero-3d-card"
          >
            <video
              class="w-full h-full object-cover"
              src="assets/images/n%C6%B0%E1%BB%9Bc%20hoa%20nam.mp4"
              autoplay
              muted
              loop
              playsinline
            ></video>
          </div>
        </div>
      </div>
    </section>

