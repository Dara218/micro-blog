# SCSS Structure

This directory contains the organized SCSS files for the Micro Blog application.

## 🗂️ File Structure

```
src/assets/styles/
├── _variables.scss          # Colors, spacing, breakpoints
├── _mixins.scss            # Responsive mixins, utility mixins
├── _components.scss        # Reusable components (buttons, forms, cards)
├── pages/
│   ├── _landing.scss       # Landing page specific styles
│   └── _login.scss         # Login page specific styles
├── main.scss               # Main file that imports everything
└── README.md               # This documentation file
```

## 🎯 Why This Structure?

- **`main.scss`** is NOT just for landing page - it's the **main entry point** that imports all styles
- **`_components.scss`** contains reusable styles (buttons, forms, cards) that any page can use
- **`pages/_login.scss`** contains login-specific styles that extend the reusable components
- **Separation of concerns**: Variables, mixins, components, and page styles are organized separately

## 📱 Usage Examples

### In Vue Components:
```vue
<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

// Your component-specific styles here
</style>
```

### Using Reusable Components:
```vue
<template>
  <!-- These classes come from _components.scss -->
  <button class="btn btn-primary">Primary Button</button>
  <button class="btn btn-outline">Outline Button</button>
  
  <!-- Form components -->
  <div class="form-group">
    <label class="form-label">Email</label>
    <input class="form-input" type="email" />
  </div>
  
  <!-- Card components -->
  <div class="card card-feature">
    <h3 class="card-title">Feature</h3>
  </div>
</template>
```

## 🎨 Available Components

### Buttons
- `.btn.btn-primary` - Primary action button
- `.btn.btn-secondary` - Secondary action button  
- `.btn.btn-outline` - Outline style button
- `.btn.btn-full` - Full-width button

### Forms
- `.form-group` - Form field container
- `.form-label` - Form field label
- `.form-input` - Form input field
- `.form-error` - Error message styling

### Cards
- `.card` - Basic card container
- `.card.card-feature` - Feature card with icon

## 🔧 Variables Available

#### Colors
- `$primary-color` - Main brand color (#3b82f6)
- `$secondary-color` - Secondary brand color (#1e40af)
- `$accent-color` - Accent color (#f59e0b)
- `$text-dark` - Dark text color (#1f2937)
- `$text-light` - Light text color (#6b7280)
- `$white` - White color (#ffffff)

#### Breakpoints
- `$mobile` - 768px and below
- `$tablet` - 769px to 1024px
- `$desktop` - 1025px and above

#### Spacing
- `$spacing-xs` - 0.5rem
- `$spacing-sm` - 1rem
- `$spacing-md` - 1.5rem
- `$spacing-lg` - 2rem
- `$spacing-xl` - 4rem

## 🚀 Mixins Available

#### Responsive Mixins
```scss
@include mobile {
  // Styles for mobile devices
}

@include tablet {
  // Styles for tablet devices
}

@include desktop {
  // Styles for desktop devices
}
```

#### Utility Mixins
```scss
@include flex-center;      // Flexbox center alignment
@include flex-between;     // Flexbox space-between
@include card-shadow;      // Consistent card shadow
@include button-base;      // Base button styles
```

## 💡 Best Practices

1. **Use Components**: Always use the predefined component classes when possible
2. **Extend Components**: Use `@extend` to create variations of existing components
3. **Mobile First**: Design for mobile first, then enhance for larger screens
4. **Consistent Variables**: Use the spacing and color variables for consistency
5. **Page-Specific Styles**: Put page-specific styles in the `pages/` directory
6. **Reusable Logic**: Put common styles in `_components.scss`

## 🔄 Creating New Pages

When creating a new page (e.g., dashboard):

1. **Create the SCSS file**: `src/assets/styles/pages/_dashboard.scss`
2. **Import in main.scss**: Add `@import 'pages/dashboard';`
3. **Use existing components**: Leverage buttons, forms, and cards from `_components.scss`
4. **Extend when needed**: Use `@extend` to create variations

## 📝 Example: Dashboard Page

```scss
// pages/_dashboard.scss
.dashboard-page {
  padding: $spacing-lg;
  
  .dashboard-header {
    @include flex-between;
    margin-bottom: $spacing-xl;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: $spacing-lg;
    
    .stat-card {
      @extend .card;
      text-align: center;
    }
  }
}
```
