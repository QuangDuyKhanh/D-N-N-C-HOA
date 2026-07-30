<!-- 16. CART DRAWER -->
    <div id="cart-overlay" class="cart-overlay"></div>
    <div id="cart-drawer" class="cart-drawer">
      <div
        class="p-6 border-b border-white/10 flex items-center justify-between"
      >
        <h3 class="font-title text-xl font-bold text-white">
          Your Shopping Cart
        </h3>
        <button id="close-cart" class="text-gray-400 hover:text-white text-2xl">
          &times;
        </button>
      </div>

      <!-- Product List in Cart -->
      <div id="cart-items" class="flex-grow overflow-y-auto">
        <!-- Rendered by JS -->
      </div>

      <!-- Summary & Checkout Button -->
      <div class="p-6 border-t border-white/10 bg-black/40 space-y-3">
        <div class="flex gap-2">
          <input
            id="coupon-input"
            type="text"
            placeholder="Enter promo code (e.g. DOCI10)"
            class="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-gray-500 uppercase focus:border-gold/50 focus:outline-none"
          />
          <button
            id="apply-coupon-btn"
            type="button"
            class="px-4 py-2 bg-gold/20 hover:bg-gold/30 border border-gold/40 text-gold text-xs font-bold rounded transition-colors"
          >
            APPLY
          </button>
        </div>
        <div id="coupon-message" class="text-[10px] hidden font-medium"></div>

        <div class="space-y-1.5 pt-2 border-t border-white/5">
          <div class="flex justify-between text-xs text-gray-400">
            <span>Subtotal</span>
            <span id="cart-subtotal">0 VND</span>
          </div>
          <div id="discount-row" class="flex justify-between text-xs text-green-400 hidden">
            <span>Discount (<span id="discount-code-name">--</span>)</span>
            <span id="cart-discount">-0 VND</span>
          </div>
          <div class="flex justify-between text-sm font-bold pt-1">
            <span>Total</span>
            <span id="cart-total" class="text-gold">0 VND</span>
          </div>
        </div>
        
        <button
          id="checkout-btn"
          class="w-full btn-luxury btn-luxury-solid py-3 text-xs mt-2"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>

