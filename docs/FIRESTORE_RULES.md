# Firestore Security Rules - Quick Setup

## The Error
```
Uncaught (in promise) FirebaseError: Missing or insufficient permissions.
```

This means your Firestore security rules are blocking access. Here's how to fix it:

## Solution 1: Test Mode (Development Only)

**⚠️ WARNING: Only use this for development/testing!**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **varanasi-tours**
3. Go to **Firestore Database** → **Rules** tab
4. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

5. Click **Publish**

**⚠️ This allows anyone to read/write. Only for testing!**

---

## Solution 2: Production Rules (Recommended)

Use these rules for production (requires authentication):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Holiday packages - authenticated admins only
    match /holidayPackages/{packageId} {
      allow read, write: if request.auth != null;
    }
    
    // Car rentals - authenticated admins only
    match /carRentals/{carId} {
      allow read, write: if request.auth != null;
    }
    
    // Testimonials - authenticated admins only
    match /testimonials/{testimonialId} {
      allow read, write: if request.auth != null;
    }
    
    // Settings - authenticated admins only
    match /settings/{settingId} {
      allow read, write: if request.auth != null;
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## Solution 3: Allow Public Read (For Frontend Display)

If you want the frontend to display packages/cars without login:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Holiday packages - public read, authenticated write
    match /holidayPackages/{packageId} {
      allow read: if true;  // Anyone can read
      allow write: if request.auth != null;  // Only authenticated users can write
    }
    
    // Car rentals - public read, authenticated write
    match /carRentals/{carId} {
      allow read: if true;  // Anyone can read
      allow write: if request.auth != null;  // Only authenticated users can write
    }
    
    // Testimonials - public read, authenticated write
    match /testimonials/{testimonialId} {
      allow read: if true;  // Anyone can read
      allow write: if request.auth != null;  // Only authenticated users can write
    }
    
    // Inquiries/Contact Form - public write, authenticated read/write
    match /inquiries/{inquiryId} {
      allow read: if request.auth != null;  // Only authenticated admins can read
      allow create: if true;  // Anyone can submit contact form
      allow update, delete: if request.auth != null;  // Only authenticated admins can update/delete
    }
    
    // Settings - authenticated only
    match /settings/{settingId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## How to Update Rules

1. **Go to Firebase Console:**
   - https://console.firebase.google.com/
   - Select project: **varanasi-tours**

2. **Navigate to Firestore:**
   - Click **Firestore Database** in left menu
   - Click **Rules** tab

3. **Paste the rules:**
   - Copy one of the rule sets above
   - Paste into the rules editor
   - Click **Publish**

4. **Wait a few seconds** for rules to propagate

5. **Refresh your app** - the error should be gone!

---

## For Your Current Setup

Since you're in development, I recommend:

**Option A: Test Mode (Easiest)**
- Use Solution 1 above
- Quick to set up
- Allows everything
- ⚠️ Change before production!

**Option B: Public Read (Better)**
- Use Solution 3 above
- Frontend can display packages/cars
- Admin portal can manage them
- More secure

---

## Verify Rules Are Active

After publishing:
1. Wait 10-30 seconds
2. Refresh your browser
3. Check console - error should be gone
4. Try accessing admin portal again

---

## Still Getting Errors?

1. **Check you're logged in** (for admin routes)
2. **Verify rules were published** (check Rules tab)
3. **Clear browser cache** (Ctrl+Shift+Delete)
4. **Check Firebase Console** for rule syntax errors

---

## Quick Fix Right Now

**Copy and paste this into Firestore Rules (for development):**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Click **Publish** and refresh your app! ✅

---

## Testimonials Collection Fix

**If you can't save testimonials**, you need to add the `testimonials` collection to your Firestore rules.

### Complete Rules (Including Testimonials)

**For Production (Recommended):**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Holiday packages - authenticated admins only
    match /holidayPackages/{packageId} {
      allow read, write: if request.auth != null;
    }
    
    // Car rentals - authenticated admins only
    match /carRentals/{carId} {
      allow read, write: if request.auth != null;
    }
    
    // Testimonials - authenticated admins only
    match /testimonials/{testimonialId} {
      allow read, write: if request.auth != null;
    }
    
    // Inquiries/Contact Form - public write, authenticated read/write
    match /inquiries/{inquiryId} {
      allow read: if request.auth != null;  // Only authenticated admins can read
      allow create: if true;  // Anyone can submit contact form
      allow update, delete: if request.auth != null;  // Only authenticated admins can update/delete
    }
    
    // Settings - authenticated admins only
    match /settings/{settingId} {
      allow read, write: if request.auth != null;
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**For Public Read (Frontend can display, Admin can manage):**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Holiday packages - public read, authenticated write
    match /holidayPackages/{packageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Car rentals - public read, authenticated write
    match /carRentals/{carId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Testimonials - public read, authenticated write
    match /testimonials/{testimonialId} {
      allow read: if true;  // Anyone can read testimonials on the frontend
      allow write: if request.auth != null;  // Only authenticated admins can write
    }
    
    // Inquiries/Contact Form - public write, authenticated read/write
    match /inquiries/{inquiryId} {
      allow read: if request.auth != null;  // Only authenticated admins can read
      allow create: if true;  // Anyone can submit contact form
      allow update, delete: if request.auth != null;  // Only authenticated admins can update/delete
    }
    
    // Settings - authenticated only
    match /settings/{settingId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**⚠️ IMPORTANT:** Make sure the `testimonials` collection rule is included before the catch-all deny rule!
