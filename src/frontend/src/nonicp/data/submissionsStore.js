const STORAGE_KEY_DONATIONS = 'shunyatax_donations';
const STORAGE_KEY_CONTACTS = 'shunyatax_contacts';

function getStorageData(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

function setStorageData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error writing to localStorage:', error);
    return false;
  }
}

export function saveDonation(donation) {
  const donations = getStorageData(STORAGE_KEY_DONATIONS);
  const newDonation = {
    ...donation,
    id: `donation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
  };
  donations.push(newDonation);
  setStorageData(STORAGE_KEY_DONATIONS, donations);
  return newDonation;
}

export function saveContactForm(contact) {
  const contacts = getStorageData(STORAGE_KEY_CONTACTS);
  const newContact = {
    ...contact,
    id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    submittedAt: Date.now(),
    read: false,
  };
  contacts.push(newContact);
  setStorageData(STORAGE_KEY_CONTACTS, contacts);
  return newContact;
}

export function getAllDonations() {
  return getStorageData(STORAGE_KEY_DONATIONS);
}

export function getAllContacts() {
  return getStorageData(STORAGE_KEY_CONTACTS);
}
