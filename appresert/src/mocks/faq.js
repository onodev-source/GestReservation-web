import { useTranslation } from "react-i18next";


const useItems =  () => {
  const { t } = useTranslation();

  return [
    {
      title: t('views.faq.started.title'),
      items: [
        {
          title: t('views.faq.started.title1'),
          content: t('views.faq.started.content1'),
        },
        {
          title: t('views.faq.started.title2'),
          content:t('views.faq.started.content2'),
        },
        {
          title: t('views.faq.started.title3'),
          content:t('views.faq.started.content3'),
        },
        {
          title: t('views.faq.started.title4'),
          content:t('views.faq.started.content4'),
        },
      ],
    },
    {
      title: t('views.faq.access.title'),
      items: [
        {
          title: t('views.faq.access.title1'),
          content:t('views.faq.access.content1'),
        },
        {
          title: t('views.faq.access.title2'),
          content:t('views.faq.access.content2'),
        },
        {
          title: t('views.faq.access.title3'),
          content:t('views.faq.access.content3'),
        },
        {
          title: t('views.faq.access.title4'),
          content:t('views.faq.access.content4'),
        },
        {
          title: t('views.faq.access.title5'),
          content:t('views.faq.access.content5'),
        },
        {
          title: t('views.faq.access.title6'),
          content:t('views.faq.access.content6'),
        },
      ],
    },
    {
      title: t('views.faq.invoicing.title'),
      items: [
        {
          title: t('views.faq.invoicing.title1'),
          content:t('views.faq.invoicing.content1')
        },
        {
          title: t('views.faq.invoicing.title2'),
          content:t('views.faq.invoicing.content2')
        },
        {
          title: t('views.faq.invoicing.title3'),
          content:t('views.faq.invoicing.content3')
        },
        {
          title: t('views.faq.invoicing.title4'),
          content:t('views.faq.invoicing.content4')
        },
      ],
    },
    {
      title: t('views.faq.security.title'),
      items: [
        {
          title: t('views.faq.security.title1'),
          content:t('views.faq.security.content1'),
        },
        {
          title: t('views.faq.security.title2'),
          content:t('views.faq.security.content2')
        },
      ],
    },
    /*{
      title: "Account settings",
      items: [
        {
          title: "How to upgrade to Pro account?",
          content:
            "Enjoy instant access to our vast library of 5,121 premium products and all upcoming new releases with super-fast download speeds powered by Amazon S3. Yes, you read that right. Getting $127,035 in value means you're saving more than 99% on all products making it the sweetest deal for premium design assets around.",
        },
        {
          title: "I forgot my password",
          content:
            "Enjoy instant access to our vast library of 5,121 premium products and all upcoming new releases with super-fast download speeds powered by Amazon S3.",
        },
        {
          title: "I can’t reset my password",
          content:
            "Enjoy instant access to our vast library of 5,121 premium products and all upcoming new releases with super-fast download speeds powered by Amazon S3. Yes, you read that right. Getting $127,035 in value means you're saving more than 99% on all products making it the sweetest deal for premium design assets around.",
        },
        {
          title: "How to upgrade to Pro account?",
          content:
            "Enjoy instant access to our vast library of 5,121 premium products and all upcoming new releases with super-fast download speeds powered by Amazon S3.",
        },
        {
          title: "How do I change and reset my password",
          content:
            "Enjoy instant access to our vast library of 5,121 premium products and all upcoming new releases with super-fast download speeds powered by Amazon S3. Yes, you read that right. Getting $127,035 in value means you're saving more than 99% on all products making it the sweetest deal for premium design assets around.",
        },
      ],
    },*/
  ]
}
export { useItems };
