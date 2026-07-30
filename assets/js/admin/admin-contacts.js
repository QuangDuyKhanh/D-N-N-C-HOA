/* ==========================================================================
   DOCI PERFUME - ADMIN CONTACTS LOGIC
   Contact messages logic: Load, filter, update read status & delete
   ========================================================================== */

function refreshContacts(isManual = false) {
  const isLocalhost = window.location.hostname === "localhost" || 
                      window.location.hostname === "127.0.0.1" || 
                      window.location.hostname.endsWith(".local") ||
                      window.location.protocol === "file:";

  if (isLocalhost) {
    fetch("backend/contact-handler.php")
      .then(res => {
        if (!res.ok) throw new Error("API not available");
        return res.json();
      })
      .then(data => {
        handleReceivedContacts(data, isManual);
      })
      .catch(err => {
        console.warn("PHP contact API unavailable, using LocalStorage...");
        const localData = JSON.parse(localStorage.getItem("doci_contacts") || "[]");
        handleReceivedContacts(localData, isManual);
      });
  } else {
    const localData = JSON.parse(localStorage.getItem("doci_contacts") || "[]");
    handleReceivedContacts(localData, isManual);
  }
}

function handleReceivedContacts(data, isManual) {
  let rawContacts = Array.isArray(data) ? data : [];
  
  const deletedIds = JSON.parse(localStorage.getItem("doci_contact_deleted") || "[]");
  rawContacts = rawContacts.filter(c => !deletedIds.includes(Number(c.id)));

  const overrides = JSON.parse(localStorage.getItem("doci_contact_overrides") || "{}");
  rawContacts.forEach(c => {
    if (c.id && overrides[c.id]) {
      c.status = overrides[c.id];
    }
  });

  contacts = rawContacts;
  contacts.sort((a, b) => new Date(b.date) - new Date(a.date));

  let newContactsCount = 0;
  if (firstContactLoad) {
    contacts.forEach(c => {
      if (c.id) knownContactIds.add(c.id);
    });
    firstContactLoad = false;
  } else {
    contacts.forEach(c => {
      if (c.id && !knownContactIds.has(c.id)) {
        knownContactIds.add(c.id);
        newContactsCount++;
      }
    });

    if (newContactsCount > 0) {
      if (typeof playChime === "function") playChime();
      if (typeof showToast === "function") showToast(`🔔 RECEIVED ${newContactsCount} NEW CONTACT MESSAGE(S)!`, "success", 6000);
    }
  }

  updateContactStats();
  renderContacts();
  
  if (isManual && typeof showToast === "function") {
    showToast("Message list refreshed!", "info");
  }
}

function updateContactStats() {
  const total = contacts.length;
  const unread = contacts.filter(c => c.status === 'unread').length;
  const read = contacts.filter(c => c.status === 'read').length;

  const totEl = document.getElementById("stat-total-contacts");
  const unrEl = document.getElementById("stat-unread-contacts");
  const reaEl = document.getElementById("stat-read-contacts");

  if (totEl) totEl.innerText = total;
  if (unrEl) unrEl.innerText = unread;
  if (reaEl) reaEl.innerText = read;

  const cAll = document.getElementById("count-c-all");
  const cUnr = document.getElementById("count-c-unread");
  const cRea = document.getElementById("count-c-read");

  if (cAll) cAll.innerText = total;
  if (cUnr) cUnr.innerText = unread;
  if (cRea) cRea.innerText = read;

  const badge = document.getElementById("contacts-badge");
  if (badge) {
    if (unread > 0) {
      badge.innerText = unread;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }
}

function setContactFilter(filter) {
  currentContactFilter = filter;
  
  const tabs = ["all", "unread", "read"];
  tabs.forEach(t => {
    const tabBtn = document.getElementById(`tab-c-${t}`);
    if (tabBtn) {
      if (t === filter) {
        tabBtn.className = "px-4 py-2 rounded-md text-xs font-semibold tracking-wider transition-all bg-gold text-black";
      } else {
        tabBtn.className = "px-4 py-2 rounded-md text-xs font-semibold tracking-wider transition-all bg-white/5 text-gray-400 hover:text-white";
      }
    }
  });
  
  renderContacts();
}

function renderContacts() {
  const container = document.getElementById("contacts-list-container");
  const noContactsMsg = document.getElementById("no-contacts-msg");
  if (!container) return;
  
  const oldCards = container.querySelectorAll(".contact-card");
  oldCards.forEach(c => c.remove());

  let filteredContacts = contacts;
  if (currentContactFilter !== "all") {
    filteredContacts = contacts.filter(c => c.status === currentContactFilter);
  }

  if (filteredContacts.length === 0) {
    if (noContactsMsg) noContactsMsg.classList.remove("hidden");
    return;
  }
  if (noContactsMsg) noContactsMsg.classList.add("hidden");

  filteredContacts.forEach(contact => {
    const card = document.createElement("div");
    const borderStyle = contact.status === 'unread' 
      ? 'border-gold/30 hover:border-gold/50 bg-gold/[0.02]' 
      : 'border-white/5 hover:border-gold/20';
      
    card.className = `contact-card glass-card rounded-xl p-5 md:p-6 transition-all border ${borderStyle} flex flex-col lg:flex-row lg:items-center justify-between gap-6`;
    
    let statusBadge = "";
    let actionButtons = "";
    
    if (contact.status === 'unread') {
      statusBadge = `<span class="bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><i class="fa-solid fa-circle text-[6px]"></i> Unread</span>`;
      actionButtons = `
        <button onclick="updateContactStatus(${contact.id}, 'read')" class="bg-gold hover:bg-gold/80 text-black text-[11px] font-bold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5 w-full justify-center"><i class="fa-solid fa-envelope-open"></i> Mark Read</button>
      `;
    } else {
      statusBadge = `<span class="bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><i class="fa-solid fa-check"></i> Read</span>`;
      actionButtons = `
        <button onclick="updateContactStatus(${contact.id}, 'unread')" class="bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] font-semibold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5 w-full justify-center"><i class="fa-solid fa-envelope"></i> Mark Unread</button>
      `;
    }

    const contactDate = new Date(contact.date).toLocaleString('en-US');

    card.innerHTML = `
      <div class="flex-grow space-y-3 max-w-lg">
        <div class="flex items-center gap-3">
          <span class="text-xs font-bold text-gold font-title tracking-wider">MESSAGE #${contact.id}</span>
          <span class="text-[10px] text-gray-500">${contactDate}</span>
          ${statusBadge}
        </div>
        <div class="space-y-1">
          <p class="text-xs font-semibold text-white"><i class="fa-regular fa-user text-[10px] text-gold w-4"></i> Name: ${contact.name}</p>
          <p class="text-xs text-gray-300"><i class="fa-regular fa-envelope text-[10px] text-gold w-4"></i> Email: <a href="mailto:${contact.email}" class="hover:underline text-gold">${contact.email}</a></p>
          ${contact.phone ? `<p class="text-xs text-gray-300"><i class="fa-solid fa-phone text-[10px] text-gold w-4"></i> Phone: <a href="tel:${contact.phone}" class="hover:underline text-gold">${contact.phone}</a></p>` : ""}
          ${contact.perfume ? `<p class="text-xs text-gray-300"><i class="fa-solid fa-bottle-droplet text-[10px] text-gold w-4"></i> Interested Fragrance: <span class="text-white font-medium">${contact.perfume}</span></p>` : ""}
        </div>
      </div>

      <div class="w-full lg:w-96 space-y-2 lg:border-l lg:border-white/10 lg:pl-6">
        <span class="text-[9px] text-gray-500 uppercase tracking-wider block">Message Content</span>
        <div class="text-xs text-gray-300 leading-relaxed bg-white/[0.02] border border-white/5 rounded-lg p-3 max-h-24 overflow-y-auto whitespace-pre-wrap">
          ${contact.message}
        </div>
      </div>

      <div class="flex lg:flex-col items-center justify-end gap-2 lg:w-36 flex-shrink-0 w-full sm:w-auto">
        ${actionButtons}
        <div class="flex gap-2 w-full">
          <a href="mailto:${contact.email}?subject=Response from DOCI Perfume&body=Hello ${contact.name}, we received your inquiry..." class="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-[11px] font-bold px-3 py-1.5 rounded transition-colors flex items-center justify-center gap-1 flex-1 text-center" title="Send email response">
            <i class="fa-solid fa-reply"></i> Mail
          </a>
          <button onclick="deleteContact(${contact.id})" class="bg-red-950/40 hover:bg-red-900/50 border border-red-500/20 text-red-400 text-[11px] font-bold px-3 py-1.5 rounded transition-colors flex items-center justify-center gap-1 flex-1" title="Delete message">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </div>
      </div>
    `;
    
    container.appendChild(card);
  });
}

function updateContactStatus(contactId, newStatus) {
  const contact = contacts.find(c => c.id === contactId);
  if (contact) {
    contact.status = newStatus;
  } else {
    if (typeof showToast === "function") showToast("Message not found", "error");
    return;
  }

  const isLocalhost = window.location.hostname === "localhost" || 
                      window.location.hostname === "127.0.0.1" || 
                      window.location.hostname.endsWith(".local") ||
                      window.location.protocol === "file:";

  if (isLocalhost) {
    fetch("backend/contact-handler.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update_status",
        contactId: contactId,
        status: newStatus
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        if (typeof showToast === "function") showToast("Message status updated!", "success");
        refreshContacts();
      } else {
        throw new Error(res.message);
      }
    })
    .catch(err => {
      console.warn("Local DB update error, saving to LocalStorage...");
      saveContactsToLocalStorage();
    });
  } else {
    saveContactsToLocalStorage();
  }

  function saveContactsToLocalStorage() {
    const overrides = JSON.parse(localStorage.getItem("doci_contact_overrides") || "{}");
    overrides[contactId] = newStatus;
    localStorage.setItem("doci_contact_overrides", JSON.stringify(overrides));
    
    if (typeof showToast === "function") showToast("Message status updated! (Saved locally)", "success");
    updateContactStats();
    renderContacts();
  }
}

function deleteContact(contactId) {
  if (!confirm("Are you sure you want to delete this message?")) return;

  const isLocalhost = window.location.hostname === "localhost" || 
                      window.location.hostname === "127.0.0.1" || 
                      window.location.hostname.endsWith(".local") ||
                      window.location.protocol === "file:";

  if (isLocalhost) {
    fetch("backend/contact-handler.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "delete_one",
        contactId: contactId
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        if (typeof showToast === "function") showToast("Message deleted successfully!", "success");
        refreshContacts();
      } else {
        throw new Error(res.message);
      }
    })
    .catch(err => {
      console.warn("Local DB delete error, deleting on LocalStorage...");
      deleteContactFromLocalStorage();
    });
  } else {
    deleteContactFromLocalStorage();
  }

  function deleteContactFromLocalStorage() {
    const deletedIds = JSON.parse(localStorage.getItem("doci_contact_deleted") || "[]");
    if (!deletedIds.includes(Number(contactId))) {
      deletedIds.push(Number(contactId));
      localStorage.setItem("doci_contact_deleted", JSON.stringify(deletedIds));
    }
    
    const index = contacts.findIndex(c => c.id === contactId);
    if (index !== -1) {
      contacts.splice(index, 1);
    }
    
    if (typeof showToast === "function") showToast("Message deleted successfully! (Saved locally)", "success");
    updateContactStats();
    renderContacts();
  }
}

function clearAllContacts() {
  if (!confirm("⚠️ Are you sure you want to clear all messages? This action cannot be undone!")) return;

  const isLocalhost = window.location.hostname === "localhost" || 
                      window.location.hostname === "127.0.0.1" || 
                      window.location.hostname.endsWith(".local") ||
                      window.location.protocol === "file:";

  if (isLocalhost) {
    fetch("backend/contact-handler.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "clear_all" })
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        if (typeof showToast === "function") showToast("All contact messages cleared!", "success");
        refreshContacts();
      } else {
        throw new Error(res.message);
      }
    })
    .catch(err => {
      console.warn("Local DB clear error, clearing on LocalStorage...");
      clearContactsLocalStorage();
    });
  } else {
    clearContactsLocalStorage();
  }

  function clearContactsLocalStorage() {
    localStorage.setItem("doci_contacts", JSON.stringify([]));
    localStorage.removeItem("doci_contact_overrides");
    localStorage.removeItem("doci_contact_deleted");
    if (typeof showToast === "function") showToast("All messages cleared in browser storage!", "success");
    refreshContacts();
  }
}
