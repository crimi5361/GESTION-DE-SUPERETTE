import React, { useEffect, useState } from 'react';
import {Form,Input,InputNumber,Button,Row,Col,Select,Card,message} from 'antd';
import Swal from 'sweetalert2';
import { Html5QrcodeScanner } from 'html5-qrcode';

const { Option } = Select;

interface Categorie {
  id_categorie: number;
  nom_categorie: string;
}

interface AddProduitProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

const AddProduit: React.FC<AddProduitProps> = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<Categorie[]>([]);

  // 🔍 Démarrage du scanner quand le composant est monté
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('scanner', { fps: 10, qrbox: 250 }, false);


    scanner.render(
      (decodedText) => {
        form.setFieldsValue({ code_barres: decodedText });
      },
      () => {
        // Ignorer les erreurs
      }
    );

    return () => {
      scanner.clear();
    };
  }, [form]);

  useEffect(() => {
    fetch('http://localhost:3001/api/StockProduit/categories')
      .then((response) => {
        if (!response.ok) throw new Error('Erreur réseau');
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => {
        console.error('Erreur chargement catégories :', error);
        message.error('Impossible de charger les catégories');
      });
  }, []);

  interface ProduitFormValues {
    code_barre: string;
    nom: string;
    nom_categorie: string;
    stock: number;
    seuil_alerte: number;
    prix_achat: number;
    prix_vente: number;
  }
  

  // Envoi des données au backend
  const onFinish = (values: ProduitFormValues) => {
    const dataToSend = {
      ...values,
      date_ajout: new Date().toISOString(),
    };

    fetch('http://localhost:3001/api/StockProduit/produits/Ajouter_produit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then(() => {
        Swal.fire({
          title: 'Succès',
          text: 'Produit ajouté avec succès',
          icon: 'success',
        });
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      })
      .catch((error) => {
          console.error("Erreur lors de l'ajout du produit:", error);
          Swal.fire({
            title: 'Erreur',
            text: "Erreur lors de l'ajout du produit",
            icon: 'error',
          });
      });
  };

  return (
    <Card
      title="Formulaire d'enregistrement de produit"
      style={{ maxWidth: 800, margin: '0 auto', marginTop: 40 }}
    >
      <div id="scanner" style={{ width: '100%', marginBottom: 20 }}></div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="code_barre"
              label="Code-barres (scanné automatiquement)"
              rules={[{ required: true, message: 'Veuillez scanner le code-barres' }]}
            >
              <Input placeholder="Scannez le produit..." autoFocus disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="nom"
              label="Nom Produit"
              rules={[{ required: true, message: 'Veuillez entrer le nom du produit' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="nom_categorie"
              label="Catégorie"
              rules={[{ required: true, message: 'Veuillez sélectionner une catégorie' }]}
            >
              <Select placeholder="Choisir une catégorie">
                {categories.map((cat) => (
                  <Option key={cat.id_categorie} value={cat.nom_categorie}>
                    {cat.nom_categorie}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="stock"
              label="Stock"
              rules={[{ required: true, message: 'Veuillez entrer le stock' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="seuil_alerte"
              label="Seuil d'alerte"
              rules={[{ required: true, message: 'Veuillez entrer le seuil' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="prix_achat"
              label="Prix d'achat"
              rules={[{ required: true, message: "Veuillez entrer le prix d'achat" }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="prix_vente"
              label="Prix de vente"
              rules={[{ required: true, message: 'Veuillez entrer le prix de vente' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Enregistrer le produit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddProduit;
