document.addEventListener("DOMContentLoaded", () => {
    // ROLAGEM SUAVE
    const smoothLinks = document.querySelectorAll("a[href^='#']");
    smoothLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  
    // VISUALIZAÇÃO EM TELA CHEIA DAS IMAGENS DE PROJETOS COM ANIMAÇÃO E BOTÃO DE FECHAR
    const projetoImagens = document.querySelectorAll(".projeto-imagem");
  
    projetoImagens.forEach((img) => {
      img.style.cursor = "zoom-in";
  
      img.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = 1000;
        overlay.style.opacity = 0;
        overlay.style.transition = "opacity 0.3s ease";
  
        const fullImg = document.createElement("img");
        fullImg.src = img.src;
        fullImg.alt = img.alt;
        fullImg.style.maxWidth = "90%";
        fullImg.style.maxHeight = "90%";
        fullImg.style.borderRadius = "10px";
        fullImg.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
        fullImg.style.cursor = "zoom-out";
        fullImg.style.transition = "transform 0.3s ease";
        fullImg.style.transform = "scale(0.95)";
  
        const closeBtn = document.createElement("div");
        closeBtn.textContent = "×";
        closeBtn.style.position = "absolute";
        closeBtn.style.top = "20px";
        closeBtn.style.right = "20px";
        closeBtn.style.fontSize = "40px";
        closeBtn.style.color = "#fff";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.transition = "color 0.3s ease";
        
        closeBtn.addEventListener("mouseover", () => {
          closeBtn.style.color = "#ff6347"; // Muda a cor ao passar o mouse
        });
        
        closeBtn.addEventListener("mouseout", () => {
          closeBtn.style.color = "#fff"; // Cor original
        });
  
        overlay.appendChild(fullImg);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
  
        // Força o reflow antes de aplicar a opacidade
        requestAnimationFrame(() => {
          overlay.style.opacity = 1;
          fullImg.style.transform = "scale(1)";
        });
  
        const closeOverlay = () => {
          overlay.style.opacity = 0;
          fullImg.style.transform = "scale(0.95)";
          setTimeout(() => {
            if (document.body.contains(overlay)) {
              document.body.removeChild(overlay);
            }
          }, 300); // tempo do fade-out
        };
  
        closeBtn.addEventListener("click", closeOverlay);
  
        overlay.addEventListener("click", (e) => {
          // Fechar ao clicar fora da imagem
          if (e.target === overlay) {
            closeOverlay();
          }
        });
  
        document.addEventListener("keydown", function escListener(e) {
          if (e.key === "Escape") {
            closeOverlay();
            document.removeEventListener("keydown", escListener);
          }
        });
      });
    });
  });
  