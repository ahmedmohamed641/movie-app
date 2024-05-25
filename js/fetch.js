async function fetchApi(url) {
    let response;

    try {
     response = await fetch(url);
     if (!response.ok) {
      throw new Error('Network response was not OK');
     }
     
    } catch (error) {
     console.error('There has been a problem with your fetch operation:', error);
    } finally {

     return await response?.json();
    }
   }
   
   export {fetchApi};