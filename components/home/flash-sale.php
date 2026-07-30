<!-- 6. PHẦN FLASH SALE (BỘ ĐẾM NGƯỢC THỜI GIAN) -->
    <section
      class="py-16 bg-gradient-to-r from-black via-[#161616] to-black border-y border-gold/15 relative overflow-hidden"
    >
      <div
        class="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        <!-- Cột Countdown (Trái) -->
        <div
          class="lg:col-span-5 text-center lg:text-left"
          data-aos="fade-right"
        >
          <span
            class="text-xs font-semibold tracking-wide text-gold uppercase bg-gold/10 px-3 py-1 rounded border border-gold/20 inline-block mb-3"
            >LIMITED TIME ONLY</span
          >
          <h2 class="font-title text-3xl md:text-4xl font-bold text-white mb-2">
            Special Offer
          </h2>
          <p class="text-xs text-gray-400 mb-6">
            Every order today receives a complimentary 2ml sample vial of your choice.
          </p>

          <!-- Hộp Countdown -->
          <div class="flex justify-center lg:justify-start gap-3 select-none">
            <div class="countdown-box">
              <span
                id="timer-hours"
                class="text-xl md:text-2xl font-bold text-gold block"
                >00</span
              >
              <span class="text-[9px] text-gray-400 uppercase tracking-wide"
                >Hours</span
              >
            </div>
            <div class="countdown-box">
              <span
                id="timer-minutes"
                class="text-xl md:text-2xl font-bold text-gold block"
                >00</span
              >
              <span class="text-[9px] text-gray-400 uppercase tracking-wide"
                >Mins</span
              >
            </div>
            <div class="countdown-box">
              <span
                id="timer-seconds"
                class="text-xl md:text-2xl font-bold text-gold block"
                >00</span
              >
              <span class="text-[9px] text-gray-400 uppercase tracking-wide"
                >Secs</span
              >
            </div>
          </div>
        </div>

        <!-- Cột Hiển thị Sản Phẩm Sale (Phải) -->
        <div
          class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          data-aos="fade-left"
        >
          <!-- Card nhỏ 1 -->
          <div class="glass-card p-4 flex flex-row gap-4 items-center">
            <img
              src="assets/images/1783734471152_7983307016412442049_g2758941255649715778_8b07fb4151c322a6d1f29e1f071e86c6.jpg"
              alt="Lady Rose"
              class="w-16 h-20 object-cover rounded flex-shrink-0"
            />
            <div class="flex-grow min-w-0">
              <h4 class="text-xs font-bold text-white truncate">
                DOCI LADY ROSE
              </h4>
              <div class="flex gap-2 items-baseline mt-0.5">
                <span class="text-xs font-bold text-gold">319,000 VND</span>
                <span class="text-[9px] text-gray-500 line-through"
                  >450,000 VND</span
                >
              </div>
              <!-- Thanh hiển thị tiến trình -->
              <div
                class="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden"
              >
                <div class="bg-gold h-full" style="width: 78%"></div>
              </div>
              <span class="text-[9px] text-gray-400 block mt-0.5"
                >Sold 39/50 bottles</span
              >
              <!-- Nút bấm hành động nhỏ gọn -->
              <div class="flex gap-1.5 mt-2">
                <button
                  onclick="openDetails('women-lady-rose')"
                  class="px-2 py-1 text-[9px] font-bold border border-[#D4AF37]/30 text-gold hover:bg-[#D4AF37] hover:text-black rounded transition-all flex-1 text-center"
                >
                  DETAILS
                </button>
                <button
                  onclick="addToCart('women-lady-rose')"
                  class="px-2 py-1 text-[9px] font-bold bg-[#D4AF37] text-[#111111] hover:bg-white transition-all rounded flex-1 text-center"
                >
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
          <!-- Card nhỏ 2 -->
          <div class="glass-card p-4 flex flex-row gap-4 items-center">
            <img
              src="assets/images/1783734467461_7983307016412442049_g2758941255649715778_3225eab47b7f0c8a09b1b9593a06cc85.jpg"
              alt="Yes Sir"
              class="w-16 h-20 object-cover rounded flex-shrink-0"
            />
            <div class="flex-grow min-w-0">
              <h4 class="text-xs font-bold text-white truncate">
                DOCI YES SIR
              </h4>
              <div class="flex gap-2 items-baseline mt-0.5">
                <span class="text-xs font-bold text-gold">319,000 VND</span>
                <span class="text-[9px] text-gray-500 line-through"
                  >450,000 VND</span
                >
              </div>
              <!-- Thanh hiển thị tiến trình -->
              <div
                class="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden"
              >
                <div class="bg-gold h-full" style="width: 86%"></div>
              </div>
              <span class="text-[9px] text-gray-400 block mt-0.5"
                >Sold 43/50 bottles</span
              >
              <!-- Nút bấm hành động nhỏ gọn -->
              <div class="flex gap-1.5 mt-2">
                <button
                  onclick="openDetails('men-ves-sir')"
                  class="px-2 py-1 text-[9px] font-bold border border-[#D4AF37]/30 text-gold hover:bg-[#D4AF37] hover:text-black rounded transition-all flex-1 text-center"
                >
                  DETAILS
                </button>
                <button
                  onclick="addToCart('men-ves-sir')"
                  class="px-2 py-1 text-[9px] font-bold bg-[#D4AF37] text-[#111111] hover:bg-white transition-all rounded flex-1 text-center"
                >
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

