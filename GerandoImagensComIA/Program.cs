using GerandoImagensComIA.Controllers;
using OpenAI;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var apiKey = builder.Configuration["OpenAI:ApiKey"];

if (string.IsNullOrWhiteSpace(apiKey))
    throw new Exception("OpenAI API key is not configured. Please set the 'OpenAI:ApiKey' configuration value.");

builder.Services.AddSingleton(_ => new OpenAIClient(apiKey));
builder.Services.Configure<OpenAIOptions>(builder.Configuration.GetSection("OpenAI"));

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:52525")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors("Frontend");

app.MapControllers();

app.Run();