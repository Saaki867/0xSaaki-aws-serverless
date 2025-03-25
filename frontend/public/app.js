document.addEventListener('DOMContentLoaded', function() {
   
    const dataList = document.getElementById('dataList');
    const refreshButton = document.getElementById('refreshData');
    const addDataForm = document.getElementById('addDataForm');
    
  
    const apiUrl = 'https://4rb8rc53k0.execute-api.eu-west-3.amazonaws.com/dev/data';
    
  
    async function fetchData() {
        dataList.innerHTML = 'Chargement des données...';
        
        try {
            console.log('Fetching data from:', apiUrl);
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Received data:', data);
            
            if (data.length === 0) {
                dataList.innerHTML = 'Aucune donnée disponible.';
                return;
            }
            
           
            let html = '<ul>';
            data.forEach(item => {
                html += `
                    <li>
                        <h3>${item.title}</h3>
                        <p>${item.content}</p>
                        <small>Créé le: ${new Date(item.createdAt).toLocaleString()}</small>
                    </li>
                `;
            });
            html += '</ul>';
            
            dataList.innerHTML = html;
            
        } catch (error) {
            console.error('Erreur lors du fetch:', error);
            dataList.innerHTML = `Erreur de chargement: ${error.message}`;
        }
    }
    
  
    async function addData(title, content) {
        try {
            console.log('Adding data:', { title, content });
            console.log('API URL:', apiUrl);
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
            }
            
            const result = await response.json();
            console.log('Result:', result);
            
          
            fetchData();
            
        } catch (error) {
            console.error('Error complete:', error);
            alert(`Erreur lors de l'ajout des données: ${error.message}`);
        }
    }
    
  
    refreshButton.addEventListener('click', fetchData);
    
  
    addDataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const titleInput = document.getElementById('dataTitle');
        const contentInput = document.getElementById('dataContent');
        
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        
        if (!title || !content) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        
        addData(title, content);
        
      
        titleInput.value = '';
        contentInput.value = '';
    });
    
 
    fetchData();
});
