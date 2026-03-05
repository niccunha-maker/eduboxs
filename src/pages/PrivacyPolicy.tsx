import { usePageMeta } from "@/hooks/usePageMeta";

const PrivacyPolicy = () => {
  usePageMeta({ title: "Política de Privacidade" });
  return (
    <div className="notebook-lines" style={{ background: "hsl(var(--muted))" }}>
      <div className="container py-16 max-w-3xl">
        <div className="animate-fade-in mb-10">
          <span className="font-handwritten text-2xl text-accent font-bold block mb-2 transform -rotate-1">
            Seus dados importam
          </span>
          <h1 className="text-3xl font-bold mb-2">Politica de Privacidade</h1>
          <p className="text-sm text-muted-foreground">
            Ultima atualizacao: 05 de marco de 2026
          </p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 animate-fade-in stagger-1">
          <p className="text-muted-foreground leading-relaxed">
            A EduBoxs respeita a privacidade dos usuarios e se compromete a proteger os dados pessoais coletados atraves de sua plataforma, em conformidade com a Lei Geral de Protecao de Dados (Lei n. 13.709/2018 — LGPD). Esta Politica de Privacidade descreve como as informacoes sao coletadas, utilizadas e protegidas.
          </p>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">1. Dados Coletados</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              A EduBoxs podera coletar dados pessoais fornecidos diretamente pelo usuario durante o uso do site, incluindo:
            </p>
            <h3 className="text-sm font-semibold mt-4 mb-2">Dados do responsavel pela compra</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              <li>nome completo;</li>
              <li>e-mail;</li>
              <li>telefone de contato.</li>
            </ul>
            <h3 className="text-sm font-semibold mt-4 mb-2">Dados relacionados ao aluno</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              <li>nome do aluno;</li>
              <li>escola;</li>
              <li>serie ou ano escolar.</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Esses dados sao necessarios para identificar corretamente o kit escolar e organizar a logistica de entrega.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">2. Finalidade do Uso dos Dados</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Os dados coletados sao utilizados para:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              <li>processar e gerenciar pedidos realizados no site;</li>
              <li>identificar corretamente os kits escolares de acordo com a escola e serie;</li>
              <li>organizar a logistica de montagem e entrega dos kits;</li>
              <li>enviar comunicacoes relacionadas ao pedido;</li>
              <li>melhorar a experiencia do usuario na plataforma.</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              A EduBoxs nao utiliza os dados pessoais para finalidades incompativeis com aquelas informadas nesta politica.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">3. Compartilhamento de Dados</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Os dados pessoais poderao ser compartilhados apenas quando necessario com:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              <li>plataformas de pagamento;</li>
              <li>servicos de hospedagem e infraestrutura do site;</li>
              <li>parceiros logisticos responsaveis pela entrega.</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3 font-medium text-foreground">
              A EduBoxs nao vende nem comercializa dados pessoais dos usuarios.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">4. Armazenamento e Seguranca</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              A EduBoxs adota medidas tecnicas e administrativas para proteger os dados pessoais contra:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              <li>acessos nao autorizados;</li>
              <li>vazamentos de informacoes;</li>
              <li>perda ou alteracao indevida de dados.</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Os dados serao armazenados apenas pelo tempo necessario para cumprir as finalidades descritas nesta politica ou conforme exigido pela legislacao aplicavel.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">5. Direitos do Titular dos Dados</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              De acordo com a LGPD, o usuario possui os seguintes direitos em relacao aos seus dados pessoais:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              <li>confirmacao da existencia de tratamento de dados;</li>
              <li>acesso aos dados pessoais armazenados;</li>
              <li>correcao de dados incompletos ou incorretos;</li>
              <li>solicitacao de exclusao de dados, quando aplicavel;</li>
              <li>revogacao do consentimento.</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Essas solicitacoes poderao ser feitas atraves dos canais de contato da EduBoxs.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">6. Uso de Cookies</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              O site da EduBoxs podera utilizar cookies para melhorar a experiencia de navegacao e compreender como os usuarios utilizam a plataforma. Os cookies podem ser utilizados para:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              <li>analise de trafego do site;</li>
              <li>melhoria de desempenho da plataforma;</li>
              <li>personalizacao da experiencia do usuario.</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              O usuario pode configurar seu navegador para bloquear ou remover cookies a qualquer momento.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">7. Alteracoes nesta Politica</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A EduBoxs podera atualizar esta Politica de Privacidade periodicamente. Sempre que houver alteracoes relevantes, a nova versao sera publicada no site com a data de atualizacao correspondente.
            </p>
          </section>

          <section className="bg-card border-2 rounded-xl p-6 shadow-ink">
            <h2 className="text-lg font-bold mb-3">8. Contato</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Em caso de duvidas sobre esta Politica de Privacidade ou sobre o tratamento de dados pessoais, o usuario podera entrar em contato com a EduBoxs atraves dos canais oficiais disponibilizados no site.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
