<!-- 17. FORM ĐẶT HÀNG NHANH (CỬA SỔ GIẢ LẬP THANH TOÁN) -->
    <div id="checkout-modal" class="detail-modal">
      <div class="detail-modal-bg"></div>
      <div class="detail-modal-container max-w-md">
        <!-- Thanh kéo (drag handle) - chỉ hiện trên mobile -->
        <div class="flex justify-center pt-3 pb-1 flex-shrink-0 md:hidden">
          <div class="w-10 h-1 bg-white/20 rounded-full"></div>
        </div>
        <!-- Header cố định -->
        <div class="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
          <div>
            <h3 class="font-title text-xl font-bold text-white">Thông Tin Nhận Hàng</h3>
            <p class="text-[10px] text-gray-500 mt-0.5">Vuốt lên xuống để xem thêm</p>
          </div>
          <button id="close-checkout" class="text-gray-400 hover:text-white text-2xl w-10 h-10 flex items-center justify-center">&times;</button>
        </div>
        <!-- Body cuộn - data-lenis-prevent cho phép scroll bằng tay/cảm ứng -->
        <div class="checkout-scroll-body p-6" data-lenis-prevent>
          <form id="order-form" class="flex flex-col gap-4">
          <div>
            <label
              class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block"
              >Họ tên người nhận</label
            >
            <input
              id="order-fullname"
              type="text"
              placeholder="Nhập họ tên đầy đủ..."
              class="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-xs text-white"
              required
            />
          </div>
          <div>
            <label
              class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block"
              >Số điện thoại</label
            >
            <input
              id="order-phone"
              type="tel"
              placeholder="Nhập số điện thoại..."
              class="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-xs text-white"
              required
            />
          </div>
          <div>
            <label
              class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block"
              >Địa chỉ giao hàng</label
            >
            <input
              id="order-address"
              type="text"
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
              class="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-xs text-white"
              required
            />
          </div>
          <div>
            <label
              class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block"
              >Ghi chú mùi hương tặng kèm</label
            >
            <input
              id="order-note"
              type="text"
              placeholder="Ví dụ: Tặng kèm mẫu thử DOCI 13..."
              class="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label
              class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block"
              >Phương thức thanh toán *</label
            >
            <select
              id="payment-method-select"
              required
              class="w-full bg-[#111111] border border-white/10 rounded px-4 py-2.5 text-xs text-white"
              onchange="togglePaymentMethod(this.value)"
            >
              <option value="cod">Thanh toán COD khi nhận hàng</option>
              <option value="bank">Chuyển khoản ngân hàng (VietQR)</option>
            </select>
          </div>

          <!-- Thông tin COD -->
          <div
            id="payment-info-cod"
            class="p-3 bg-white/5 border border-white/10 rounded text-[11px] text-gray-300 font-light mt-2"
          >
            <i class="fa-solid fa-circle-info text-gold mr-1"></i>
            <span
              >Bạn chọn hình thức <strong>Thanh toán COD khi nhận hàng</strong>.
              DOCI miễn phí vận chuyển cho mọi đơn hàng hôm nay. Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng.</span
            >
          </div>

          <!-- Thông tin Chuyển khoản ngân hàng VietQR SePay -->
          <div
            id="payment-info-bank"
            class="hidden mt-4 space-y-4"
          >
            <!-- Thẻ ngân hàng sang trọng -->
            <div class="relative overflow-hidden rounded-xl border border-gold/30 bg-gradient-to-br from-[#1c1c1c] to-[#0a0a0a] p-5 shadow-2xl">
              <!-- Hiệu ứng bóng sáng -->
              <div class="absolute -right-10 -bottom-10 w-28 h-28 bg-gold/10 rounded-full blur-2xl"></div>
              
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-credit-card text-gold text-sm animate-pulse"></i>
                  <span class="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">Thanh toán SePay VietQR</span>
                </div>
                <span class="text-xs font-bold text-white tracking-widest font-title">Vietcombank</span>
              </div>
              
              <div class="space-y-3">
                <div>
                  <span class="text-[8px] text-gray-400 uppercase block">Số tài khoản</span>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-semibold text-white tracking-wider">1041618870</span>
                    <button type="button" class="text-gold hover:text-white transition-colors p-1" onclick="copyToClipboard('1041618870', 'Đã sao chép số tài khoản!')" title="Sao chép số tài khoản">
                      <i class="fa-regular fa-copy text-xs"></i>
                    </button>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <span class="text-[8px] text-gray-400 uppercase block">Chủ tài khoản</span>
                    <span class="text-xs font-medium text-gray-200">QUANG DUY KHANH</span>
                  </div>
                  <div>
                    <span class="text-[8px] text-gray-400 uppercase block">Số tiền</span>
                    <div id="payment-bank-amount" class="flex items-center gap-1">
                      <span class="text-xs font-bold text-gold">0đ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Mã QR Code động VietQR SePay -->
            <div class="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl p-4 text-center gap-3">
              <div class="flex items-center gap-2 text-gold text-xs font-bold">
                <i class="fa-solid fa-qrcode"></i>
                <span>Quét mã VietQR chuyển khoản tự động</span>
              </div>
              
              <!-- Khung viền mã QR sang trọng -->
              <div class="relative rounded-2xl shadow-xl border border-gold/40 hover:border-gold/80 transition-colors duration-300 overflow-hidden w-full max-w-[260px] bg-white p-2">
                <img id="vietqr-preview-img" src="https://vietqr.app/img?bank=Vietcombank&acc=1041618870&template=compact&amount=0&des=DOCI" alt="Vietcombank VietQR" class="w-full h-auto object-contain rounded-xl block" />
              </div>

              <!-- Nội dung chuyển khoản chuẩn -->
              <div class="w-full bg-black/40 border border-gold/30 rounded-lg p-3 text-left space-y-2">
                <div class="flex justify-between items-center text-[11px]">
                  <span class="text-gray-400">Nội dung chuyển khoản:</span>
                  <button type="button" class="text-gold font-bold hover:underline text-[11px] flex items-center gap-1" onclick="copyToClipboard(document.getElementById('vietqr-preview-content').innerText, 'Đã sao chép nội dung chuyển khoản!')">
                    <i class="fa-regular fa-copy text-xs"></i> Sao chép
                  </button>
                </div>
                <div id="vietqr-preview-content" class="text-xs font-bold text-gold bg-gold/10 px-3 py-1.5 rounded border border-gold/20 text-center tracking-wider font-mono">
                  DH...
                </div>
              </div>
              
              <div id="payment-checking-status" class="flex items-center justify-center gap-2 text-[11px] text-gold bg-gold/10 px-3 py-2 rounded-lg border border-gold/20 w-full">
                <i class="fa-solid fa-circle-notch fa-spin text-xs"></i>
                <span>Hệ thống SePay tự động duyệt đơn khi tiền về</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="w-full btn-luxury btn-luxury-solid py-3 text-xs mt-2"
          >
            XÁC NHẬN ĐẶT HÀNG
          </button>
        </form>
        </div><!-- end scrollable body -->
      </div>
    </div>
