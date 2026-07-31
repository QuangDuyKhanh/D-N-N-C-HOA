<!-- 19. AUTH & ACCOUNT MODALS (LOGIN / REGISTER / PROFILE) -->
<!-- AUTH MODAL (LOGIN / REGISTER / FORGOT PASSWORD) -->
<div id="auth-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300">
  <div class="auth-modal-container relative w-full max-w-md bg-[#161616] border border-gold/30 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden transform scale-95 transition-transform duration-300">
    <div class="absolute -top-20 -right-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
    
    <button id="close-auth-modal" class="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 z-10">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="text-center mb-6">
      <span class="font-title text-2xl font-bold tracking-[5px] text-white">DOCI</span>
      <span class="text-[9px] uppercase tracking-[4px] text-gold font-semibold block -mt-1">PERFUME</span>
      <p id="auth-modal-subtitle" class="text-xs text-gray-400 mt-2 font-light">Welcome to the world of luxury fragrances</p>
    </div>

    <div class="flex border-b border-white/10 mb-6 font-semibold text-xs uppercase tracking-wider">
      <button id="auth-tab-login-btn" class="auth-tab-btn active flex-1 py-2.5 text-center transition-all border-b-2 border-gold text-gold" onclick="switchAuthTab('login')">
        Sign In
      </button>
      <button id="auth-tab-register-btn" class="auth-tab-btn flex-1 py-2.5 text-center transition-all border-b-2 border-transparent text-gray-400 hover:text-white" onclick="switchAuthTab('register')">
        Register
      </button>
    </div>

    <!-- TAB 1: LOGIN FORM -->
    <form id="login-form" class="auth-tab-content space-y-4">
      <div>
        <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide mb-1">Email or Phone Number *</label>
        <div class="relative">
          <i class="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
          <input type="text" id="login-email" required placeholder="name@example.com" class="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors" />
        </div>
      </div>

      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide">Password *</label>
          <button type="button" class="text-[10px] text-gold hover:underline" onclick="switchAuthTab('forgot')">Forgot Password?</button>
        </div>
        <div class="relative">
          <i class="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
          <input type="password" id="login-password" required placeholder="••••••••" class="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors" />
          <button type="button" class="toggle-password-btn absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300" onclick="togglePasswordVisibility('login-password', this)">
            <i class="fa-regular fa-eye"></i>
          </button>
        </div>
      </div>

      <button type="submit" class="w-full btn-luxury btn-luxury-solid py-3 text-xs uppercase tracking-wider font-semibold rounded-xl mt-2">
        Sign In Now
      </button>

      <div class="p-3 bg-gold/10 border border-gold/20 rounded-xl text-[11px] text-gray-300 text-center">
        <span class="text-gold font-bold">Try Demo Account:</span><br/>
        Email: <code class="text-white font-mono bg-black/40 px-1.5 py-0.5 rounded cursor-pointer hover:text-gold" onclick="fillDemoAccount()">khachhang@gmail.com</code> | Pass: <code class="text-white font-mono bg-black/40 px-1.5 py-0.5 rounded">123456</code>
      </div>
    </form>

    <!-- TAB 2: REGISTER FORM -->
    <form id="register-form" class="auth-tab-content space-y-3 hidden">
      <div>
        <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide mb-1">Full Name *</label>
        <div class="relative">
          <i class="fa-solid fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
          <input type="text" id="reg-name" required placeholder="John Doe" class="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors" />
        </div>
      </div>

      <div>
        <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide mb-1">Email *</label>
        <div class="relative">
          <i class="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
          <input type="email" id="reg-email" required placeholder="email@example.com" class="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors" />
        </div>
      </div>

      <div>
        <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide mb-1">Phone Number *</label>
        <div class="relative">
          <i class="fa-solid fa-phone absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
          <input type="tel" id="reg-phone" required placeholder="+123456789" class="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors" />
        </div>
      </div>

      <div>
        <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide mb-1">Password *</label>
        <div class="relative">
          <i class="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
          <input type="password" id="reg-password" required placeholder="Minimum 6 characters" minlength="6" class="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors" />
          <button type="button" class="toggle-password-btn absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300" onclick="togglePasswordVisibility('reg-password', this)">
            <i class="fa-regular fa-eye"></i>
          </button>
        </div>
      </div>

      <div>
        <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide mb-1">Confirm Password *</label>
        <div class="relative">
          <i class="fa-solid fa-shield-halved absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
          <input type="password" id="reg-confirm-password" required placeholder="Re-enter password" class="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors" />
        </div>
      </div>

      <label class="flex items-center gap-2 cursor-pointer select-none pt-1">
        <input type="checkbox" required checked class="rounded border-gray-700 bg-black text-gold focus:ring-gold accent-[#D4AF37]" />
        <span class="text-[10px] text-gray-400">I agree to the <a href="#" class="text-gold underline">Terms of Service</a> and <a href="#" class="text-gold underline">Privacy Policy</a></span>
      </label>

      <button type="submit" class="w-full btn-luxury btn-luxury-solid py-3 text-xs uppercase tracking-wider font-semibold rounded-xl mt-2">
        Create Account
      </button>
    </form>

    <!-- TAB 3: FORGOT PASSWORD FORM -->
    <form id="forgot-form" class="auth-tab-content space-y-4 hidden">
      <div class="text-center p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300">
        <i class="fa-solid fa-key text-gold text-xl mb-1 block"></i>
        Enter your registered email or phone number to receive reset instructions.
      </div>

      <div>
        <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide mb-1">Registered Email / Phone *</label>
        <div class="relative">
          <i class="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
          <input type="text" id="forgot-email" required placeholder="name@example.com" class="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors" />
        </div>
      </div>

      <button type="submit" class="w-full btn-luxury btn-luxury-solid py-3 text-xs uppercase tracking-wider font-semibold rounded-xl">
        Send Reset Request
      </button>

      <div class="text-center pt-2">
        <button type="button" class="text-xs text-gold hover:underline" onclick="switchAuthTab('login')">
          <i class="fa-solid fa-arrow-left mr-1"></i> Back to Sign In
        </button>
      </div>
    </form>
  </div>
</div>

<!-- ACCOUNT MODAL (CUSTOMER PROFILE & ORDERS) -->
<div id="account-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300">
  <div class="account-modal-container relative w-full max-w-2xl bg-[#161616] border border-gold/30 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col transform scale-95 transition-transform duration-300">
    <div class="absolute -top-20 -right-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

    <button id="close-account-modal" class="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 z-10">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <!-- User Profile Header -->
    <div class="flex items-center gap-4 pb-6 border-b border-white/10">
      <div class="w-14 h-14 rounded-full border-2 border-gold bg-gold/10 flex items-center justify-center text-gold text-2xl font-bold shadow-lg">
        <i class="fa-solid fa-user-shield"></i>
      </div>
      <div>
        <h3 id="account-user-name" class="font-title text-xl font-bold text-white">DOCI Customer</h3>
        <p id="account-user-email" class="text-xs text-gold font-light">khachhang@gmail.com</p>
        <span class="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-gold/20 text-gold border border-gold/30">
          <i class="fa-solid fa-crown mr-1"></i>VIP Member
        </span>
      </div>
    </div>

    <!-- Dashboard Tabs -->
    <div class="flex overflow-x-auto custom-scrollbar border-b border-white/10 my-4 text-xs font-semibold uppercase tracking-wide gap-2">
      <button id="account-tab-profile-btn" class="account-tab-btn active px-4 py-2.5 text-gold border-b-2 border-gold whitespace-nowrap transition-all" onclick="switchAccountTab('profile')">
        <i class="fa-regular fa-id-card mr-1.5"></i>Personal Info
      </button>
      <button id="account-tab-orders-btn" class="account-tab-btn px-4 py-2.5 text-gray-400 hover:text-white border-b-2 border-transparent whitespace-nowrap transition-all" onclick="switchAccountTab('orders')">
        <i class="fa-solid fa-box-open mr-1.5"></i>My Orders (<span id="account-order-count">0</span>)
      </button>
      <button id="account-tab-password-btn" class="account-tab-btn px-4 py-2.5 text-gray-400 hover:text-white border-b-2 border-transparent whitespace-nowrap transition-all" onclick="switchAccountTab('password')">
        <i class="fa-solid fa-key mr-1.5"></i>Change Password
      </button>
    </div>

    <!-- Tab Contents -->
    <div class="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-4">
      <!-- TAB 1: PROFILE INFO -->
      <form id="account-profile-form" class="account-tab-content space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide mb-1">Full Name</label>
            <input type="text" id="acc-profile-name" required class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold focus:outline-none" />
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide mb-1">Phone Number</label>
            <input type="tel" id="acc-profile-phone" required class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold focus:outline-none" />
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide mb-1">Email Address (Cannot be changed)</label>
          <input type="email" id="acc-profile-email" disabled class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-gray-400 cursor-not-allowed" />
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide mb-1">Default Shipping Address</label>
          <textarea id="acc-profile-address" rows="3" placeholder="Enter house number, street, city..." class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold focus:outline-none resize-none"></textarea>
        </div>

        <div class="flex justify-end pt-2">
          <button type="submit" class="btn-luxury btn-luxury-solid px-6 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xl">
            <i class="fa-regular fa-floppy-disk mr-1.5"></i>Save Changes
          </button>
        </div>
      </form>

      <!-- TAB 2: MY ORDERS -->
      <div id="account-orders-container" class="account-tab-content hidden space-y-4">
        <div id="user-orders-list" class="space-y-3">
          <!-- Rendered dynamically -->
        </div>
      </div>

      <!-- TAB 3: CHANGE PASSWORD -->
      <form id="account-password-form" class="account-tab-content hidden space-y-4">
        <div>
          <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide mb-1">Current Password *</label>
          <input type="password" id="acc-old-pass" required placeholder="••••••••" class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold focus:outline-none" />
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide mb-1">New Password *</label>
          <input type="password" id="acc-new-pass" required placeholder="Minimum 6 characters" minlength="6" class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold focus:outline-none" />
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-gray-300 uppercase tracking-wide mb-1">Confirm New Password *</label>
          <input type="password" id="acc-confirm-new-pass" required placeholder="Re-enter new password" class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold focus:outline-none" />
        </div>

        <div class="flex justify-end pt-2">
          <button type="submit" class="btn-luxury btn-luxury-solid px-6 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xl">
            Update Password
          </button>
        </div>
      </form>
    </div>

    <div class="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
      <button type="button" onclick="handleLogout()" class="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors">
        <i class="fa-solid fa-right-from-bracket"></i> Sign Out
      </button>
      <span class="text-[10px] text-gray-500">DOCI Perfume Customer Care</span>
    </div>
  </div>
</div>
