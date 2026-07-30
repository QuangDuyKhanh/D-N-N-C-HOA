<!-- 8. COLLECTIONS SECTION -->
    <section id="collections-section" class="py-24 bg-darkSurface relative">
      <div class="container mx-auto px-4 md:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <span
            class="text-xs font-semibold tracking-wide text-gold uppercase block mb-1"
            >ONLINE BOUTIQUE</span
          >
          <h2 class="font-title text-3xl md:text-4xl font-bold text-white mb-4">
            DOCI Perfume Collection
          </h2>
          <p
            class="text-xs md:text-sm text-gray-400 max-w-xl mx-auto font-light"
          >
            Select a refined fragrance for yourself or an exquisite luxury gift set for your loved ones.
          </p>
        </div>

        <!-- Big Tabs -->
        <div
          class="flex justify-center gap-8 md:gap-16 border-b border-white/5 mb-8 text-lg font-bold tracking-wide cursor-pointer select-none"
          data-aos="fade-up"
        >
          <span
            id="tab-women"
            class="tab-btn active pb-3 text-gold border-b-2 border-[#D4AF37] transition-all duration-300"
            >WOMEN'S COLLECTION</span
          >
          <span
            id="tab-men"
            class="tab-btn pb-3 text-gray-400 hover:text-white transition-all duration-300"
            >MEN'S COLLECTION</span
          >
        </div>

        <!-- Small Scent Group Filters (Rendered dynamically in app.js) -->
        <div
          id="filter-container"
          class="flex flex-wrap justify-center gap-3 mb-10"
          data-aos="fade-up"
        >
          <!-- Rendered by JS -->
        </div>

        <!-- Grid Container -->
        <div
          id="product-grid"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <!-- Rendered by JS -->
        </div>
      </div>
    </section>

    <!-- 9. FRAGRANCE PYRAMID -->
    <section class="py-24 bg-darkBg relative overflow-hidden">
      <div class="container mx-auto px-4 md:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <span
            class="text-xs font-semibold tracking-wide text-gold uppercase block mb-1"
            >SCENT KNOWLEDGE</span
          >
          <h2 class="font-title text-3xl md:text-4xl font-bold text-white">
            The 3-Tier Fragrance Pyramid
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Infographic Pyramid -->
          <div class="lg:col-span-7 flex flex-col gap-6" data-aos="fade-right">
            <!-- Tier 1 -->
            <div class="glass-card p-6 flex gap-5 border-l-4 border-gold">
              <div
                class="w-12 h-12 bg-gold/10 border border-gold rounded-full flex items-center justify-center text-gold shrink-0 text-xl font-bold font-title"
              >
                1
              </div>
              <div>
                <h4 class="font-title text-lg font-bold text-white mb-1">
                  Top Notes
                </h4>
                <span class="text-[10px] text-gold uppercase font-semibold"
                  >Radiates for the first 5 - 15 minutes</span
                >
                <p class="text-xs text-gray-300 mt-2 font-light">
                  The initial impression, fresh and captivating immediately upon application. Features vibrant citrus notes like Lemon, Bergamot, Pear, or Strawberry.
                </p>
              </div>
            </div>
            <!-- Tier 2 -->
            <div class="glass-card p-6 flex gap-5 border-l-4 border-gold">
              <div
                class="w-12 h-12 bg-gold/10 border border-gold rounded-full flex items-center justify-center text-gold shrink-0 text-xl font-bold font-title"
              >
                2
              </div>
              <div>
                <h4 class="font-title text-lg font-bold text-white mb-1">
                  Middle / Heart Notes
                </h4>
                <span class="text-[10px] text-gold uppercase font-semibold"
                  >Sustains for the next 2 - 4 hours</span
                >
                <p class="text-xs text-gray-300 mt-2 font-light">
                  The true character and soul of the perfume. Blossoms with elegant Jasmine, seductive Rose, crisp Lavender, or warm Cinnamon and Cumin.
                </p>
              </div>
            </div>
            <!-- Tier 3 -->
            <div class="glass-card p-6 flex gap-5 border-l-4 border-gold">
              <div
                class="w-12 h-12 bg-gold/10 border border-gold rounded-full flex items-center justify-center text-gold shrink-0 text-xl font-bold font-title"
              >
                3
              </div>
              <div>
                <h4 class="font-title text-lg font-bold text-white mb-1">
                  Base Notes
                </h4>
                <span class="text-[10px] text-gold uppercase font-semibold"
                  >Deeply lingers for 6 - 8+ hours</span
                >
                <p class="text-xs text-gray-300 mt-2 font-light">
                  Deep, warm notes that anchor to your skin. Creates a lasting impression with rich Amber, sensual Musk, and deep Cedarwood.
                </p>
              </div>
            </div>
          </div>

          <!-- Right: Visual -->
          <div
            class="lg:col-span-5 text-center lg:text-left"
            data-aos="fade-left"
          >
            <div
              class="relative w-full max-w-sm mx-auto p-4 border border-gold/10 rounded-2xl bg-black/30"
            >
              <img
                src="assets/images/doci-bottle-presentation.jpg"
                alt="DOCI Perfume Bottle Design"
                class="rounded-xl w-full"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-5"
              >
                <span
                  class="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wide"
                  >DOCI Perfume</span
                >
                <p class="font-title text-white text-md font-bold">
                  6 - 8H Longevity • 1 - 2M Projection
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

