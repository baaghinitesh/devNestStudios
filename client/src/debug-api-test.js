// Quick API test
fetch('/api/services')
  .then(response => response.json())
  .then(data => {
    console.log('✅ Services API Response:', {
      count: data.length,
      firstService: data[0]?.title,
      fullData: data
    });
  })
  .catch(error => {
    console.error('❌ Services API Error:', error);
  });

fetch('/api/testimonials?featured=true')
  .then(response => response.json())
  .then(data => {
    console.log('✅ Testimonials API Response:', {
      count: data.length,
      firstTestimonial: data[0]?.clientName,
      fullData: data
    });
  })
  .catch(error => {
    console.error('❌ Testimonials API Error:', error);
  });