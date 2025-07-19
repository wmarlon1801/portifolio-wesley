# 🚀 Configuração do Formspree - Formulário de Contato

## 📋 Passo a Passo Completo

### **1. Criar Conta no Formspree**
1. Acesse: https://formspree.io/
2. Clique em "Get Started" ou "Sign Up"
3. Crie conta com seu email ou GitHub
4. Confirme o email de verificação

### **2. Criar Novo Formulário**
1. Faça login no Formspree
2. Clique em "New Form" ou "+"
3. Nome: "Portfolio Contact" ou "Contato Portfolio"
4. Clique em "Create Form"

### **3. Copiar o Form ID**
1. Após criar, você verá o Form ID (ex: `xrgjqjqj`)
2. Copie esse ID completo
3. Substitua no arquivo `src/config/contact.js`:

```javascript
formspree: {
  enabled: true,
  formId: 'SEU_FORM_ID_AQUI', // ← Substitua pelo seu ID real
  endpoint: 'https://formspree.io/f/'
}
```

### **4. Configurar Campos (Opcional)**
O Formspree detecta automaticamente os campos, mas você pode personalizar:

**Campos que serão enviados:**
- `name` - Nome da pessoa
- `email` - Email da pessoa
- `subject` - Assunto da mensagem
- `message` - Mensagem
- `date` - Data/hora do envio
- `language` - Idioma do formulário

### **5. Testar o Formulário**

#### **Teste Local:**
1. Substitua o Form ID no arquivo de configuração
2. Execute o projeto: `npm run dev`
3. Vá para a seção "Contato"
4. Preencha o formulário
5. Clique em "Enviar Mensagem"
6. Verifique se aparece "Mensagem enviada com sucesso!"

#### **Verificar no Formspree:**
1. Acesse seu dashboard no Formspree
2. Clique no formulário criado
3. Vá na aba "Submissions"
4. Você verá as mensagens recebidas

### **6. Configurações Avançadas (Opcional)**

#### **Notificações por Email:**
1. No dashboard do Formspree
2. Vá em "Settings" → "Notifications"
3. Configure para receber emails quando alguém enviar

#### **Spam Protection:**
1. O Formspree já tem proteção anti-spam
2. Você pode configurar filtros adicionais

#### **Customização de Email:**
1. Vá em "Settings" → "Email Templates"
2. Personalize o template de resposta

### **7. Troubleshooting**

#### **Erro "Form ID inválido":**
- Verifique se o Form ID está correto
- Certifique-se de que o formulário foi criado

#### **Erro de CORS:**
- O Formspree já está configurado para aceitar requisições
- Se der erro, verifique se o Form ID está certo

#### **Mensagem não aparece no dashboard:**
- Aguarde alguns minutos (pode ter delay)
- Verifique se não foi para spam
- Teste novamente

### **8. URLs de Teste**

**Formulário funcionando:**
- URL: `https://formspree.io/f/SEU_FORM_ID`
- Método: POST
- Content-Type: application/json

### **9. Exemplo de Dados Enviados**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "subject": "Proposta de Projeto",
  "message": "Olá! Gostaria de conversar sobre um projeto...",
  "date": "2025-01-15T10:30:00.000Z",
  "language": "pt"
}
```

## ✅ **Próximos Passos**

1. **Crie a conta** no Formspree
2. **Crie o formulário** e copie o ID
3. **Substitua** o ID no arquivo de configuração
4. **Teste** o formulário
5. **Verifique** se as mensagens chegam no dashboard

## 🎯 **Resultado Final**

Após a configuração, quando alguém preencher o formulário:
- ✅ Mensagem será enviada para seu email
- ✅ Aparecerá no dashboard do Formspree
- ✅ Usuário receberá confirmação de sucesso
- ✅ Dados ficam organizados e seguros

**Precisa de ajuda com algum passo?** 😊 