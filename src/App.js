import { useForm, Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card from "./components/Card";
import * as S from "./styles";
import { historicFinances, insertItem } from "./api/routes/finances";
import Button from "./components/Button";
import TextField from "./components/TextField";
import EnhancedTable from "./components/Table";

function ControllerTextField({ label, name, control, errors, ...props }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          label={label}
          error={errors}
          helperText={errors?.message}
          {...props}
          {...field}
        />
      )}
    />
  );
}

function App() {
  const [age, setAge] = useState("");
  const [historic, setHistoric] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    // defaultValues: {
    //   user: "",
    //   password: "",
    //   keepMeConnected: false,
    // },
    // resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchHistoricFinances = async () => {
      const response = await historicFinances();
      setHistoric(response);
    };

    fetchHistoricFinances();
  }, []);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      await insertItem({
        ...data,
        date_input: new Date(),
      });
    } catch (error) {
      console.log("🚀 ~ file: App.js:72 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <S.Wrappper>
      <S.WrappperForm method="post" onSubmit={handleSubmit(onSubmit)}>
        <ControllerTextField
          name="title"
          label="Título"
          control={control}
          errors={errors?.title}
        />

        <Controller
          name="operation"
          control={control}
          render={({ field }) => (
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={age}
              onChange={handleChange}
              row
              {...field}
            >
              <FormControlLabel
                value="entrada"
                control={<Radio />}
                label="Entrada"
              />
              <FormControlLabel
                value="saída"
                control={<Radio />}
                label="Saída"
              />
            </RadioGroup>
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              title="category"
              value={age}
              label="Categoria"
              onChange={handleChange}
              {...field}
            >
              <MenuItem value={10}>Gastos essenciais</MenuItem>
              <MenuItem value={20}>Lazer</MenuItem>
              <MenuItem value={30}>Saúde</MenuItem>
            </Select>
          )}
        />

        <ControllerTextField
          label="Valor(R$)"
          name="value_item"
          control={control}
          errors={errors?.title}
        />
        <Button type="submit" loading={isSubmitting}>
          Cadastrar
        </Button>
      </S.WrappperForm>
      <S.WrappperCard>
        <Card type="entrada" value="1" />
        <Card type="saída" value="2" />
        <Card type="total" value="3" />
      </S.WrappperCard>

      {historic.length > 0 ? (
        <EnhancedTable data={historic} />
      ) : (
        <p>Loading...</p>
      )}
    </S.Wrappper>
  );
}

export default App;
