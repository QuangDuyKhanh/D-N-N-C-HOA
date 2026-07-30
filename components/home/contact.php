<!-- 14. PHẦN THÔNG TIN LIÊN HỆ & SHOWROOM -->
    <section id="contact-section" class="py-24 bg-darkSurface relative">
      <div class="container mx-auto px-4 md:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <span
            class="text-xs font-semibold tracking-wide text-gold uppercase block mb-1"
            >KẾT NỐI VỚI DOCI</span
          >
          <h2 class="font-title text-3xl md:text-4xl font-bold text-white">
            Liên Hệ & Showroom
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <!-- Trái: Form Liên hệ -->
          <div
            class="lg:col-span-6 glass-card p-8 border-gold/10"
            data-aos="fade-right"
          >
            <h3 class="font-title text-xl font-bold text-white mb-6">
              Gửi Tin Nhắn Cho DOCI
            </h3>
            <form id="contact-form" class="flex flex-col gap-4">
              <div>
                <label
                  class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block"
                  >Họ và Tên</label
                >
                <input
                  type="text"
                  id="contact-name"
                  placeholder="Nhập tên của bạn..."
                  class="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-xs text-white transition-all"
                  required
                />
              </div>
              <div>
                <label
                  class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block"
                  >Email liên hệ</label
                >
                <input
                  type="email"
                  id="contact-email"
                  placeholder="Nhập email..."
                  class="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-xs text-white transition-all"
                  required
                />
              </div>
              <div>
                <label
                  class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block"
                  >Nội dung tin nhắn</label
                >
                <textarea
                  id="contact-message"
                  placeholder="Nhập tin nhắn..."
                  rows="4"
                  class="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-xs text-white transition-all"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full btn-luxury btn-luxury-solid py-3 text-xs mt-2"
              >
                GỬI TIN NHẮN
              </button>
            </form>
          </div>

          <!-- Phải: Bản đồ & Địa chỉ -->
          <div
            class="lg:col-span-6 flex flex-col justify-between"
            data-aos="fade-left"
          >
            <div class="glass-card p-8 border-gold/10 flex-grow mb-6">
              <h3 class="font-title text-xl font-bold text-white mb-6">
                DOCI Showroom
              </h3>
              <ul class="flex flex-col gap-4 text-xs text-gray-300 font-light">
                <li class="flex items-start gap-3">
                  <i class="fa-solid fa-location-dot text-gold mt-0.5"></i>
                  <span
                    >Showroom chính: Tòa nhà DOCI, Quận 1, Thành phố Hồ Chí
                    Minh, Việt Nam</span
                  >
                </li>
                <li class="flex items-center gap-3">
                  <i class="fa-solid fa-phone text-gold"></i>
                  <span>Hotline tư vấn: <a href="tel:0328595037" class="hover:text-gold transition-colors">0328.595.037</a></span>
                </li>
                <li class="flex items-center gap-3">
                  <i class="fa-solid fa-envelope text-gold"></i>
                  <span>Email hỗ trợ: <a href="mailto:quangkhanh515@gmail.com" class="hover:text-gold transition-colors">quangkhanh515@gmail.com</a></span>
                </li>
                <li class="flex items-center gap-3">
                  <i class="fa-solid fa-clock text-gold"></i>
                  <span>Thời gian mở cửa: 09:00 - 21:30 (Hàng ngày)</span>
                </li>
              </ul>
            </div>

            <!-- Google Map Mô phỏng bằng ảnh xịn hoặc iframe ẩn -->
            <div
              class="w-full h-48 border border-white/10 rounded-lg overflow-hidden"
            >
              <iframe
                class="w-full h-full grayscale opacity-80"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4602324263124!2d106.6974868!3d10.7760194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391946023!2zUXXhuq1uIDEsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1700000000000"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 15. CHÂN TRANG (FOOTER) -->
    <footer class="bg-black py-16 border-t border-gold/15">
      <div
        class="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12"
      >
        <!-- Cột Logo -->
        <div class="lg:col-span-4 flex flex-col gap-4">
          <a href="#" class="flex flex-col items-start">
            <span
              class="font-title text-2xl font-bold tracking-[6px] text-white"
              >DOCI</span
            >
            <span
              class="text-[8px] uppercase tracking-[4px] text-[#D4AF37] font-semibold -mt-1"
              >PERFUME</span
            >
          </a>
          <p
            class="text-[11px] text-gray-400 font-light leading-relaxed max-w-sm"
          >
            Thương hiệu nước hoa cảm hứng thiết kế cao cấp cho người Việt. DOCI
            kiến tạo phong thái lịch lãm và quyến rũ vượt thời gian.
          </p>
          <!-- MXH -->
          <div class="flex gap-4 mt-2">
            <a
              href="https://www.facebook.com/Q.D.Khanh.One/"
              target="_blank"
              class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors"
              ><i class="fa-brands fa-facebook-f text-sm"></i
            ></a>
            <a
              href="#"
              class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors"
              ><i class="fa-brands fa-instagram text-sm"></i
            ></a>
            <a
              href="#"
              class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors"
              ><i class="fa-brands fa-tiktok text-sm"></i
            ></a>
          </div>
        </div>

        <!-- Cột Links -->
        <div class="lg:col-span-3 flex flex-col gap-3">
          <h4 class="text-xs font-bold text-white uppercase tracking-wide mb-2">
            Liên Kết Nhanh
          </h4>
          <ul class="flex flex-col gap-2 text-xs text-gray-400 font-light">
            <li>
              <a href="#hero-section" class="hover:text-gold transition-colors"
                >Trang Chủ</a
              >
            </li>
            <li>
              <a href="#about-section" class="hover:text-gold transition-colors"
                >Về DOCI Perfume</a
              >
            </li>
            <li>
              <a
                href="#collections-section"
                class="hover:text-gold transition-colors"
                >Bộ Sưu Tập</a
              >
            </li>
            <li>
              <a href="#best-sellers" class="hover:text-gold transition-colors"
                >Nước Hoa Bán Chạy</a
              >
            </li>
          </ul>
        </div>

        <!-- Cột Dịch Vụ -->
        <div class="lg:col-span-2 flex flex-col gap-3">
          <h4 class="text-xs font-bold text-white uppercase tracking-wide mb-2">
            Chính Sách
          </h4>
          <ul class="flex flex-col gap-2 text-xs text-gray-400 font-light">
            <li>
              <a href="#" class="hover:text-gold transition-colors"
                >Chính sách vận chuyển</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-gold transition-colors"
                >Chính sách đổi trả</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-gold transition-colors"
                >Bảo mật thông tin</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-gold transition-colors"
                >Điều khoản dịch vụ</a
              >
            </li>
          </ul>
        </div>

        <!-- Cột Newsletter -->
        <div class="lg:col-span-3 flex flex-col gap-3">
          <h4 class="text-xs font-bold text-white uppercase tracking-wide mb-2">
            Đăng Ký Nhận Tin
          </h4>
          <p class="text-[11px] text-gray-400 font-light">
            Nhận thông tin ưu đãi mới nhất và bí quyết mùi hương từ chuyên gia
            DOCI.
          </p>
          <form class="flex gap-2 mt-2">
            <input
              type="email"
              placeholder="Email của bạn..."
              class="bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white flex-grow"
              required
            />
            <button
              type="submit"
              class="bg-gold hover:bg-gold/80 text-[#111111] font-bold px-4 rounded text-xs"
            >
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>

      <!-- Bản quyền -->
      <div
        class="container mx-auto px-4 md:px-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-500"
      >
        <p>&copy; 2026 DOCI Perfume. Bảo lưu mọi quyền.</p>
        <p class="mt-2 sm:mt-0">Thiết kế bởi Đội ngũ sáng tạo DOCI</p>
      </div>
    </footer>
