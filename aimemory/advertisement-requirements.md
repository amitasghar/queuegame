# Advertisement System Requirements

## Image-Based Banner Ads

### Format & Structure
- **File Format**: JPG images
- **Layout**: Rectangular banner format
- **Storage**: Images will be stored in a dedicated folder
- **Loading**: Ads will be loaded from the image folder and rotated automatically

### Implementation Notes
- Ad system should scan folder for available JPG files
- Implement rotation mechanism to cycle through available banners
- Consider preloading images for smooth transitions
- Maintain aspect ratio and responsive scaling
- Keep existing fade transition effects from animations.css

### Content Strategy
Based on the design document, ads will parody:
- Queue Enhancement Services (SkipLine Pro™, Queue Anxiety Pills)
- Gaming Accessories (Gaming chairs, RGB lights, queue-optimized peripherals)
- Productivity Tools (TaxQueue Pro, Queue University)
- Queue Insurance & Services (QueueSafe™, Position Recovery)
- Food & Lifestyle (Queue snacks, dating apps, real estate)

### Technical Considerations
- Create assets/images/ads/ folder structure
- Update ad-system.js to handle image rotation instead of text
- Implement error handling for missing images
- Consider lazy loading for performance
- Maintain click interactions leading to "sold out" pages

### Future Enhancement
- Dynamic ad sizing based on content
- A/B testing different ad formats
- Analytics tracking for "clicks" (even though they lead nowhere)