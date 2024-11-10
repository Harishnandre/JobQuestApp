const GoogleMap=()=>{
  return(
      <div className="map-container" style={{width:'100vw',height:'100vh'}}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7202.773146605155!2d81.8660671!3d25.492151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399aca789e0c84a5%3A0x2c27733a7529bf08!2sMNNIT%20Allahabad%20Campus%2C%20Teliarganj%2C%20Prayagraj%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1712328647485!5m2!1sen!2sin" width="100%" height="100%" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
  );
  }
  
  export default GoogleMap;