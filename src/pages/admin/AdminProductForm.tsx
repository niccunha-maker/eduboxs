import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, X, Upload, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCategories } from "@/hooks/useCategories";
import { useToast } from "@/hooks/use-toast";

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: categories } = useCategories();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    school_name: "",
    grade: "",
    category_id: "",
    price_cents: 0,
    compare_price_cents: 0,
    stock: 0,
    is_active: true,
    image_urls: [] as string[],
    items_list: [] as { name: string; qty: number }[],
  });

  const [newItem, setNewItem] = useState({ name: "", qty: 1 });

  useEffect(() => {
    if (!id) return;
    supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) {
          setForm({
            name: data.name,
            slug: data.slug,
            description: data.description || "",
            school_name: data.school_name || "",
            grade: data.grade || "",
            category_id: data.category_id || "",
            price_cents: data.price_cents,
            compare_price_cents: data.compare_price_cents || 0,
            stock: data.stock,
            is_active: data.is_active,
            image_urls: data.image_urls || [],
            items_list: (data.items_list as any) || [],
          });
        }
      });
  }, [id]);

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      slug: form.slug || generateSlug(form.name),
      category_id: form.category_id || null,
      compare_price_cents: form.compare_price_cents || null,
    };

    let error;
    if (isEditing) {
      ({ error } = await supabase.from("products").update(payload).eq("id", id));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
    }

    setLoading(false);

    if (error) {
      toast({ title: "Erro ao salvar produto", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isEditing ? "Produto atualizado!" : "Produto criado!" });
      navigate("/admin/produtos");
    }
  };

  const addKitItem = () => {
    if (!newItem.name) return;
    setForm({ ...form, items_list: [...form.items_list, { ...newItem }] });
    setNewItem({ name: "", qty: 1 });
  };

  const removeKitItem = (index: number) => {
    setForm({
      ...form,
      items_list: form.items_list.filter((_, i) => i !== index),
    });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from("product-images")
        .upload(path, file, { contentType: file.type });

      if (error) {
        toast({ title: "Erro no upload", description: error.message, variant: "destructive" });
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(path);

      newUrls.push(urlData.publicUrl);
    }

    setForm((prev) => ({ ...prev, image_urls: [...prev.image_urls, ...newUrls] }));
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container py-8 max-w-2xl">
      <Button variant="ghost" size="sm" className="mb-6" onClick={() => navigate("/admin/produtos")}>
        <ArrowLeft className="mr-1 h-4 w-4" />
        Voltar
      </Button>

      <h1 className="text-3xl font-bold mb-8">
        {isEditing ? "Editar Produto" : "Novo Produto"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informacoes Basicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nome do Kit</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value, slug: generateSlug(e.target.value) })
                }
                placeholder="Ex: Kit 3o Ano - Colegio ABC"
                required
              />
            </div>
            <div>
              <Label>Slug (URL)</Label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="kit-3o-ano-colegio-abc"
              />
            </div>
            <div>
              <Label>Descricao</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Descricao do kit..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Colegio</Label>
                <Input
                  value={form.school_name}
                  onChange={(e) => setForm({ ...form, school_name: e.target.value })}
                  placeholder="Nome do colegio"
                />
              </div>
              <div>
                <Label>Serie</Label>
                <Input
                  value={form.grade}
                  onChange={(e) => setForm({ ...form, grade: e.target.value })}
                  placeholder="Ex: 3o Ano"
                />
              </div>
            </div>
            <div>
              <Label>Categoria</Label>
              <Select
                value={form.category_id}
                onValueChange={(v) => setForm({ ...form, category_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preco e Estoque</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Preco (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={(form.price_cents / 100).toFixed(2)}
                  onChange={(e) => setForm({ ...form, price_cents: Math.round(Number(e.target.value) * 100) })}
                  placeholder="450.00"
                  required
                />
              </div>
              <div>
                <Label>Preco anterior (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.compare_price_cents ? (form.compare_price_cents / 100).toFixed(2) : ""}
                  onChange={(e) =>
                    setForm({ ...form, compare_price_cents: e.target.value ? Math.round(Number(e.target.value) * 100) : 0 })
                  }
                  placeholder="Opcional — mostra riscado"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Se preenchido, aparece riscado ao lado do preco atual
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Estoque</Label>
                <Input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Deixe 0 para vender sem controle de estoque
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch
                  checked={form.is_active}
                  onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                />
                <Label>Ativo</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imagens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {form.image_urls.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {form.image_urls.map((url, i) => (
                  <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border bg-muted">
                    <img src={url} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 h-6 w-6 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full"
              >
                {uploading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Adicionar Imagens
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Itens do Kit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {form.items_list.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="flex-1">
                  {item.qty}x {item.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => removeKitItem(i)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Input
                placeholder="Nome do item"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Qtd"
                value={newItem.qty}
                onChange={(e) => setNewItem({ ...newItem, qty: Number(e.target.value) })}
                className="w-20"
                min={1}
              />
              <Button type="button" variant="outline" size="icon" onClick={addKitItem}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Salvando..." : isEditing ? "Atualizar Produto" : "Criar Produto"}
        </Button>
      </form>
    </div>
  );
};

export default AdminProductForm;
